# Read DBF File

```cmd
import parseDBF from 'parsedbf';
```
> [!NOTE]
> parsedbf 是另一个轻量的 Node.js DBF 解析库，专为 ESM/CommonJS 双兼容设计，API 更简洁。以下是完整的使用指南：

## 一、核心依赖安装

```cmd
运行
# 安装 parsedbf 库
npm install parsedbf
# 或 yarn add parsedbf
```

## 二、基础使用（ESM/CommonJS 两种方式）
### 1. ES 模块（ESM，推荐，Node.js ≥14）
```javascript
运行
// 你的文件需命名为 .mjs，或在 package.json 中设置 "type": "module"
import parseDBF from 'parsedbf';
import fs from 'fs/promises';
import path from 'path';

/**
 * 解析 DBF 文件（ESM 方式）
 * @param {string} filePath - DBF 文件路径
 * @param {string} encoding - 编码（默认 gbk）
 * @returns {Promise<{fields: [], records: []}>}
 */
async function parseDBFWithESM(filePath, encoding = 'gbk') {
  try {
    // 读取 DBF 文件为 Buffer（必须先读为二进制）
    const buffer = await fs.readFile(path.resolve(filePath));
    
    // 核心解析：buffer → 字段 + 记录
    const { fields, records } = parseDBF(buffer, encoding);
    
    return { fields, records };
  } catch (err) {
    throw new Error(`解析失败：${err.message}`);
  }
}

// 使用示例
(async () => {
  const result = await parseDBFWithESM('./test.dbf', 'gbk');
  
  // 打印字段信息
  console.log('【字段信息】');
  result.fields.forEach((field, idx) => {
    console.log(`字段${idx+1}：`, field); // { name: '字段名', type: 'C', length: 20, decimal: 0 }
  });
  
  // 打印数据记录
  console.log('\n【数据记录（前5条）】');
  result.records.slice(0, 5).forEach((record, idx) => {
    console.log(`记录${idx+1}：`, record); // { 字段名1: '值1', 字段名2: 123, ... }
  });
})();
```
### 2. CommonJS 方式（兼容旧版 Node.js）
```javascript
运行
// 传统 require 方式
const parseDBF = require('parsedbf').default; // 注意加 .default
const fs = require('fs');
const path = require('path');

// 同步解析
function parseDBFWithCJS(filePath, encoding = 'gbk') {
  const buffer = fs.readFileSync(path.resolve(filePath));
  const { fields, records } = parseDBF(buffer, encoding);
  return { fields, records };
}

// 使用示例
const result = parseDBFWithCJS('./test.dbf', 'gbk');
console.log('字段：', result.fields);
console.log('记录数：', result.records.length);
```
## 三、parsedbf 核心 API 说明
### 1. 主函数参数
```javascript
运行
// 参数	类型	说明
// buffer	Buffer	必须：DBF 文件的二进制 Buffer（通过 fs.readFile/fs.readFileSync 获取）
// encoding	String	可选：文件编码，默认 latin1（西文），中文用 gbk/gb2312
parseDBF(buffer, encoding = 'latin1')
```
### 2. 返回值结构
```javascript
运行
{
  fields: [
    { name: 'ID', type: 'N', length: 10, decimal: 0 }, // 数值型
    { name: 'NAME', type: 'C', length: 20, decimal: 0 }, // 字符型
    { name: 'CREATE_DATE', type: 'D', length: 8, decimal: 0 } // 日期型
  ],
  records: [
    { ID: 1, NAME: '张三', CREATE_DATE: '20250101' },
    { ID: 2, NAME: '李四', CREATE_DATE: '20250102' }
  ]
}
```
### 3. 字段类型映射
```text
DBF 类型	说明	解析后 JS 类型
C	字符型	String
N	数值型	Number
D	日期型	String（YYYYMMDD）
L	布尔型	Boolean
M	备注型	String
```
## 四、关键注意事项
### 1. 编码问题（解决乱码）  

中文 DBF 优先用 gbk，若乱码尝试 gb2312/latin1；   
若 parsedbf 不支持指定编码，可搭配 iconv-lite 转码：   

```javascript
运行
import parseDBF from 'parsedbf';
import iconv from 'iconv-lite';
import fs from 'fs/promises';

async function parseDBFWithIconv(filePath) {
  const buffer = await fs.readFile(filePath);
  // 先转码为 gbk 再解析
  const gbkBuffer = iconv.encode(iconv.decode(buffer, 'latin1'), 'gbk');
  const result = parseDBF(gbkBuffer, 'gbk');
  return result;
}
```
### 2. 处理大文件（分片解析）

> [!NOTE]
> parsedbf 本身是一次性解析（加载全量 Buffer 到内存），若处理大文件，需手动分片或改用流式库（如 dbf）：

```javascript
运行
// 大文件建议改用流式解析（回到之前的 dbf 库）
import dbf from 'dbf';
const reader = dbf.open('./big.dbf', { encoding: 'gbk' });
reader.on('record', (record) => {
  // 逐行处理，避免内存溢出
  console.log(record);
});
```

### 3. 日期字段转换

> [!NOTE]
> parsedbf 解析日期型（D）返回 YYYYMMDD 字符串，可封装转换函数：

```javascript
运行
function formatDBFDate(dateStr) {
  if (!dateStr || dateStr === '00000000') return null;
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6) - 1; // 月份从 0 开始
  const day = dateStr.slice(6, 8);
  return new Date(year, month, day);
}

// 使用示例
const result = await parseDBFWithESM('./test.dbf');
result.records.forEach(record => {
  record.CREATE_DATE = formatDBFDate(record.CREATE_DATE);
});
```

## 五、parsedbf vs dbf 对比

```text
特性	parsedbf	dbf
模块类型	ESM/CommonJS 双兼容	仅 CommonJS
API 复杂度	极简（单函数）	偏复杂（事件 / 流式）
内存占用	高（全量 Buffer）	低（流式逐行）
大文件支持	差	优
编码兼容性	一般（需手动转码）	好（内置多编码）
备注字段（M 类型）	不支持	支持
```

## 总结

若你用 ESM 模块 且处理 小文件，parsedbf 是最佳选择（API 简洁）；

若处理 大文件 / 备注字段，建议改用 dbf 库（流式解析更高效）；

中文乱码优先尝试 gbk 编码，或搭配 iconv-lite 转码。
