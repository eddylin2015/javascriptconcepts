const http = require('http');
const querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var mimes = {
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.7z': 'application/z-7z-compressed'
};

function getModel() { return require(`./model-mysql-pool`); }

//
// param_postData=querystring.stringify(param_postData_obj)
//
function HttpGet_pyapi(param_path, response, method = "GET", param_postData = { str: "ABC" }) {

    if (method == "GET") {
        http.get(
            {
                hostname: "127.0.0.1", port: 85,
                path: param_path, method: 'GET',
                headers: { 'Cookie': "sidkey", "X-Authorization": "sidkey" }
            },
            (res) => {
                response.set(res.headers);
                res.pipe(response)
            }).on('error', (e) => {
                console.log(e);
            });
    } else if (method == "POST") {
        param_postData = JSON.stringify(param_postData)
        //console.log(param_postData)
        let options = {
            hostname: "127.0.0.1", port: 85,
            path: param_path, method: 'POST',
            //headers: {'Cookie': "sidkey","X-Authorization": "sidkey", 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(param_postData) }
            headers: { 'Cookie': "sidkey", "X-Authorization": "sidkey", 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(param_postData) }
        };
        let req = http.request(options, (res) => {
            response.set(res.headers);
            res.pipe(response)
        });
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        req.write(param_postData);
        req.end();
    }
}

//
// var filename = process.argv[process.argv.length-2];
// var jpgfilename = process.argv[process.argv.length-1];
//
function Uploadfile(filename, jpgfilename) {
    var ext = path.extname(filename);
    var mime = mimes[ext.toLowerCase()];
    if (!mime) return;
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats.size;
    const base64 = fs.readFileSync(filename, "base64");
    var filesize = base64.length; //filesize,fileSizeInBytes
    var boundary = "----WebKitFormBoundaryENl50aIWkiBG2Umn";
    let options = {
        host: '192.168.101.253',
        //host: '192.168.62.253',
        port: '81',
        path: '/NewUI/',
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data; boundary=' + boundary,
            'content-length': filesize * 2
        },
        form: { 'file1': filename }
    }
    var req = http.request(options, function (res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    req.on('error', function (err) {
        console.log("upload err : " + err);
    });
    req.write("--" + boundary + "\r\n");
    req.write('Content-Disposition: form-data; name="file1"; filename="' + jpgfilename + '"\r\n');
    req.write("Content-Transfer-Encoding: base64\r\n");
    req.write(`Content-Type: ${mime}\r\n\r\n`);
    req.write(base64)
    req.write("\r\n\r\n--" + boundary + "--\r\n");
    req.end();
    console.log("send base64")
}

function Dowanloadfile(path_, fn = null, sid = null) {
    if (fn == null) fn = "temp.tmp";
    return new Promise(resolve => {
        var file = fs.createWriteStream(fn);
        http.get(
            {
                host: '192.168.62.253',
                port: '81',
                path: path_,
                method: 'GET',
                headers: { 'Cookie': sid }
            },
            (res) => {
                res.pipe(file);
                file.on('finish', function () {
                    file.close(function () {
                        if (res.statusCode == 404) { resolve(fn + ": Not File!"); }
                        else {
                            resolve(fn + ": Save File!");
                        }
                    }
                    );
                });
            }).on('error', (e) => { console.log(e); });
    });
}

///
/// formatString("helo, {0}!","world") # like C# format String.
/// console.log(formatString('Hello {0}, your order {1} has been shipped.', 'John', 10001));
///
const formatString = (template, ...args) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

/*
* iMarkCalc_Act and SimpleCalc
*/
class iMarkCalC_Act {
    constructor() {
        this.mark1 = 0; this.mark2 = 0; this.mark3 = 0; this.mark = 0; this.total_crs_ncp = 0; this.crs_cnt = 0;
        this.ran1 = 0; this.ran2 = 0; this.ran3 = 0; this.ran = 0; this.allpass1 = 0; this.allpass2 = 0; this.allpass3 = 0;
        this.voca_cult_avg = 0; this.voca_cult_avg1 = 0; this.voca_cult_avg2 = 0; this.voca_cult_avg3 = 0;
        this.voca_prof_avg = 0; this.voca_prof_avg1 = 0; this.voca_prof_avg2 = 0; this.voca_prof_avg3 = 0;
        this.voca_cult_mue = 0; this.voca_cult_cnt = 0;
        this.voca_prof_mue = 0; this.voca_prof_cnt = 0;
        this.allpass1 = 0;
        this.allpass2 = 0;
        this.allpass3 = 0;
        this.pass1_cnt = 0; this.pass2_cnt = 0; this.pass3_cnt = 0;
    }
    /*
    * Clear buffer 
    */
    method_clear() {
        for (let k in this) if (k.indexOf("method_") < 0) this[k] = 0;
    }
    /*
    * Count courses , culture courses, prof courses
    */
    method_inc_count(r) {
        this.crs_cnt++;
        this.voca_cult_cnt += r.c_t_type == '職業文化' ? 1 : 0;
        this.voca_prof_cnt += r.c_t_type == '職業專業' ? 1 : 0;
    }
    /*
    * Calc total  3:3:4 rate forEach term.
    */
    method_total(r, ng_dict, total1, total2, total3, mue) {
        r.total1 = total1
        r.total2 = total2
        r.total3 = total3
        r.total = r.total1 * 0.3 + r.total2 * 0.3 + r.total3 * 0.4
        r.VOCA_MUE = r.total < 60 ? Math.max(r.total, mue) : r.total
        r.sub_c_p = r.total < 60 && r.pk < 60 ? r.sub_c_p = ng_dict[r.c_ng_id] : 0;
        r.P_X = r.total < 60 ? (r.sub_c_p < 0 ? 1 : 2) : 0;
        r.eog = 1;
    }
    /*
    * Accumulate r.total + Agg_.mark-> Agg_.mark 
    */
    method_agg_data(ro) {
        this.pass1_cnt += ro.total1 < 60 ? 0 : 1;
        this.pass2_cnt += ro.total2 < 60 ? 0 : 1;
        this.pass3_cnt += ro.total < 60 ? 0 : 1;
        this.mark1 += ro.total1;
        this.mark2 += ro.total2;
        this.mark3 += ro.total3;
        this.mark += ro.total;
        this.total_crs_ncp += ro.sub_c_p;
    }
    /*
    * Export Agg_data -> dataSet
    */
    method_assignTo(dataSet) {
        this.mark1 = Math.round(this.mark1 / this.crs_cnt * 100) / 100;
        this.mark2 = Math.round(this.mark2 / this.crs_cnt * 100) / 100;
        this.mark3 = Math.round(this.mark3 / this.crs_cnt * 100) / 100;
        this.mark = Math.round(this.mark / this.crs_cnt * 100) / 100;
        this.allpass1 = this.pass1_cnt == this.crs_cnt ? 1 : 0;
        this.allpass2 = this.pass2_cnt == this.crs_cnt ? 1 : 0;
        this.allpass3 = this.pass3_cnt == this.crs_cnt ? 1 : 0;
        for (let k in this)
            if (k.indexOf("_cnt") < 0 && k.indexOf("method_") < 0) dataSet[k] = this[k];

    }
    /*
    * Rank
    */
    method_rank(ds) {
        let mark1_rank_map = ds.map(r => r["cd"][0].mark1);
        let mark2_rank_map = ds.map(r => r["cd"][0].mark2);
        let mark3_rank_map = ds.map(r => r["cd"][0].mark3);
        let mark_rank_map = ds.map(r => r["cd"][0].mark);
        mark1_rank_map.sort((a, b) => b - a);
        mark2_rank_map.sort((a, b) => b - a);
        mark3_rank_map.sort((a, b) => b - a);
        mark_rank_map.sort((a, b) => b - a);
        ds.forEach(r => {
            r["cd"][0].ran1 = mark1_rank_map.indexOf(r["cd"][0].mark1) + 1;
            r["cd"][0].ran2 = mark2_rank_map.indexOf(r["cd"][0].mark2) + 1;
            r["cd"][0].ran3 = mark3_rank_map.indexOf(r["cd"][0].mark3) + 1;
            r["cd"][0].ran = mark_rank_map.indexOf(r["cd"][0].mark) + 1;
        })
    }
    /*
    * round 
    */
    method_round_total(r) {
        r.total1 = Math.round(r.total1 * 100) / 100;
        r.total2 = Math.round(r.total2 * 100) / 100;
        r.total3 = Math.round(r.total3 * 100) / 100;
        r.total = Math.round(r.total * 100) / 100;
        // Math.round((num + Number.EPSILON) * 100) / 100
    }
    static method_NoOfConduct(conduct) {
        let cd = conduct.Trim().Replace("＋", "+").Replace("－", "-").Replace("一", "-");
        let rule = "丙-,丙,丙+,乙-,乙,乙+,甲-,甲";
        let ra = rule.Split(',');
        for (let i = 0; i < ra.length; i++) {
            if (ra[i].Equals(cd)) return i;
        }
        return -1;
    }
    static method_ConductOfNo(c) {
        if (c < 0) return "";
        let rule = "丙-,丙,丙+,乙-,乙,乙+,甲-,甲";
        let ra = rule.Split(',');
        if (c >= ra.Length) c = ra.Length - 1;
        return ra[c];
    }
    static GetEval(cno, allpass, mark, conduct, later, absence, truancy) {
        let EvalAddHonorInt = 0;
        cno = cno.ToUpper();
        let HonorEvalDESC_ARR = ["品學卓越生\n", "品學兼優生\n", "品行優異生\n", "學業優異生\n", "勤學生\n"];
        let SMg = [85, 80, 75];
        let PMg = [101, 85, 75];
        let mg = null;
        if (cno[0] == 'P') { mg = PMg; }
        else if (cno[0] == 'S') { mg = SMg; }
        else { mg = SMg; }
        let res = "";
        let noOfcond = iMarkCalC_Act.NoOfConduct(conduct);
        if (allpass == 1) {
            if (mark >= mg[0] && noOfcond >= 6) {
                res += HonorEvalDESC_ARR[0];
            }
            else if (mark >= mg[1] && noOfcond >= 6) {
                res += HonorEvalDESC_ARR[1];
            }
            else if (noOfcond >= 6) {
                res += HonorEvalDESC_ARR[2];
            }
            else if (mark >= mg[1] && noOfcond >= 4) {
                res += HonorEvalDESC_ARR[3];
            }
            else if (mark >= mg[2] && noOfcond >= 4) {
                res += HonorEvalDESC_ARR[4];
            }
        }
        if (later == 0 && absence == 0 && truancy == 0) {
            res += "全勤生";
        }
        return [res, EvalAddHonorInt];
    }

}
class TMarkCalC_Act extends iMarkCalC_Act {
    constructor() {
        super();
    }
    method_assignTo(dataSet) {
        if (this.voca_cult_cnt > 0 && this.voca_prof_cnt > 0) {
            this.voca_cult_avg1 /= this.voca_cult_cnt;
            this.voca_cult_avg2 /= this.voca_cult_cnt;
            this.voca_cult_avg3 /= this.voca_cult_cnt;
            this.voca_cult_avg /= this.voca_cult_cnt;
            this.voca_cult_mue /= this.voca_cult_cnt;
            this.voca_prof_avg1 /= this.voca_prof_cnt;
            this.voca_prof_avg2 /= this.voca_prof_cnt;
            this.voca_prof_avg3 /= this.voca_prof_cnt;
            this.voca_prof_avg /= this.voca_prof_cnt;
            this.voca_prof_mue /= this.voca_prof_cnt;
        }
        super.method_assignTo(dataSet)
    }
    method_agg_data(ro) {
        super.method_agg_data(ro);
        if (ro.c_t_type == '職業文化') {
            this.voca_cult_avg1 += ro.total1;
            this.voca_cult_avg2 += ro.total2;
            this.voca_cult_avg3 += ro.total3;
            this.voca_cult_avg += ro.total;
            this.voca_cult_mue += ro.VOCA_MUE;
        }
        if (ro.c_t_type == '職業專業') {
            this.voca_prof_avg1 += ro.total1;
            this.voca_prof_avg2 += ro.total2;
            this.voca_prof_avg3 += ro.total3;
            this.voca_prof_avg += ro.total;
            this.voca_prof_mue += ro.VOCA_MUE;
        }
    }
}
// '職業文化' '職業專業'
function MarkIterateCalc(ds, ng_dict, iCalc = null, cno = "S") {
    let cd_set = iCalc ? iCalc : new TMarkCalC_Act();
    for (let arr_ of ds) {
        cd_set.method_clear();
        let mk = arr_["mk"]
        let cd = arr_["cd"]
        let mk_group = []
        mk.forEach((r, i, self_) => {
            if (r.rate == 100) {
                cd_set.method_total(r, ng_dict,
                    r.t1 * 0.6 + r.e1 * 0.4,
                    r.t2 * 0.6 + r.e2 * 0.4,
                    r.t3 * 0.6 + r.e3 * 0.4,
                    r.pk)
                cd_set.method_round_total(r)
                cd_set.method_inc_count(r)
                cd_set.method_agg_data(r)
            } else if (i < mk.length && r.groupid !== mk[i + 1].groupid) {
                mk_group.push(r)
                let agg_ = mk_group.reduce((sum, ro, idx) => {
                    let tt1 = (ro.t1 * 0.6 + ro.e1 * 0.4) * ro.rate / 100
                    let tt2 = (ro.t2 * 0.6 + ro.e2 * 0.4) * ro.rate / 100
                    let tt3 = (ro.t3 * 0.6 + ro.e3 * 0.4) * ro.rate / 100
                    sum[0] += (ro.t1 * 0.6 + ro.e1 * 0.4) * ro.rate / 100
                    sum[1] += (ro.t2 * 0.6 + ro.e2 * 0.4) * ro.rate / 100
                    sum[2] += (ro.t3 * 0.6 + ro.e3 * 0.4) * ro.rate / 100
                    sum[3] += Math.max(tt1 * 0.3 + tt2 * 0.3 + tt3 * 0.4, r.pk) * ro.rate / 100
                    return sum;
                }, [0, 0, 0, 0])
                cd_set.method_total(r, ng_dict, ...agg_);
                if (r.P_X == 1) {
                    for (let idx = i; idx > i - mk_group.length; idx--) {
                        let t_ = (r.t1 * 0.6 + r.e1 * 0.4 + r.t2 * 0.6 + r.e2 * 0.4) * 0.3 + (r.t3 * 0.6 + r.e3 * 0.4) * 0.4;
                        mk[idx].P_X = t_ < 60 ? (mk[idx].pk < 60 ? 1 : 2) : 0;
                    }
                }
                cd_set.method_round_total(r)
                cd_set.method_inc_count(r)
                cd_set.method_agg_data(r)
                mk_group = []
            } else {
                mk_group.push(r)
            }
        })
        if (mk_group.length > 0) throw new Error("mk_group is not empty!");
        cd_set.method_assignTo(cd[0])

    }
    cd_set.method_rank(ds)
    console.table(ds[0]["mk"])
    console.log(ds[0]["cd"])
    //console.log(ds[1]["cd"])
}

function mk_adpt_Update(ds, tablename = "mk") {
    let sql = "update mrs_stud_course set ? where stud_c_id=?;"
    for (let arr_ of ds) {
        let mk = arr_["mk"]
        for (let r of mk) {
            let data = { total1: 0, total2: 0, total3: 0, total: 0, VOCA_MUE: 0, sub_c_p: 0, P_X: 0, eog: 0 }
            for (let k in data) data[k] = r[k];
            getModel().DataReaderQuery(sql, [data, r.stud_c_id], (err, results) => {/*console.log(err,results)*/ })
        }
    }
    let mk_u_sql = `update mrs_stud_course set total1=?,total2=?,total3=?,total=?,VOCA_MUE=?,sub_c_p=?,P_X=?,eog=? where stud_c_id=?`;
}
function cd_adpt_Update(ds, tablename = "cd") {
    let sql = "update mrs_stud_conduct set ? where stud_ref=?;"
    for (let arr_ of ds) {
        let mk = arr_["cd"]
        for (let r of mk) {
            let data = {
                mark1: 0,
                mark2: 0,
                mark3: 0,
                mark: 0,
                total_crs_ncp: 0,
                voca_cult_avg1: 0,
                voca_cult_avg2: 0,
                voca_cult_avg3: 0,
                voca_cult_avg: 0,
                voca_cult_mue: 0,
                voca_prof_avg1: 0,
                voca_prof_avg2: 0,
                voca_prof_avg3: 0,
                voca_prof_avg: 0,
                voca_prof_mue: 0,
                allpass1: 0,
                allpass2: 0,
                allpass3: 0,
            }
            for (let k in data) data[k] = r[k];
            getModel().DataReaderQuery(sql, [data, r.stud_ref], (err, results) => {/*console.log(err,results)*/ })
        }
    }
    let cd_u_sql = `update mrs_stud_conduct set mark1=?,mark2=?,mark3=?,
    mark=?,total_crs_ncp=?,voca_cult_avg1=?,voca_cult_avg2=?,voca_cult_avg3=?,voca_cult_avg=?,
    voca_cult_mue=?,voca_prof_avg1=?,voca_prof_avg2=?,voca_prof_avg3=?, voca_prof_avg=?, voca_prof_mue=?,
    allpass1=?,allpass2=?,allpass3=?, SchoolEval1=?, SchoolEval2=?,  SchoolEval3=?, conduct=?
    where stud_ref=?`;
}

function cross_tbl_SecTerm(std_dt, crs_dt, ng_dict, ds) {
    //console.table(crs_dt.slice(0, 10))
    let crs = []
    let cols_len = crs_dt.length;
    let crs_dict = {};
    let ng_posi = {};
    let ign_cnt = 0;
    crs_dt.forEach((r, i) => {
        if (r.rate == 100
            || (i < cols_len && r.groupid !== crs_dt[i + 1].groupid)) {
            crs_dict[r.course_d_id] = i - ign_cnt;
            ng_posi[i - ign_cnt] = ng_dict[r.c_ng_id];
            crs.push(r.rate == 100 ? r.courseName : r.c_field)
        } else {
            ign_cnt++;
        }
    })
    let cross_ = []
    std_dt.forEach(elm => { cross_.push(Array.from({ length: cols_len + 1 }, (_, i) => null)) })
    std_dt.forEach((elm, i) => {
        ds[i]["mk"].forEach((mk, mi) => {
            if (mk.course_d_id in crs_dict) {
                let m_ = Math.round((mk.total2 * 0.3 + mk.total1 * 0.3 - 36) * 6 / 4);
                cross_[i][crs_dict[mk.course_d_id]] = m_;
                if (m_ < 0) {
                    let ng_ = ng_posi[crs_dict[mk.course_d_id]];
                    cross_[i][cols_len] = cross_[i][cols_len] ? ng_ : cross_[i][cols_len] + ng_;
                }
            }
        })
    });
    crs = [...crs, ...Array.from({ length: ign_cnt + 1 }, (_, i) => "")]
    return [cross_, std_dt, crs];
}

function cross_tbl(std_dt, crs_dt, ng_dict, ds) {
    let crs = []
    let cols_len = crs_dt.length;
    let crs_dict = {};
    crs_dt.forEach((r, i) => { crs_dict[r.course_d_id] = i; crs.push(r.courseName) })
    let cross_ = []
    std_dt.forEach(elm => { cross_.push(Array.from({ length: cols_len }, (_, i) => null)) })
    std_dt.forEach((elm, i) => {
        ds[i]["mk"].forEach((mk, mi) => {
            cross_[i][crs_dict[mk.course_d_id]] = mk.total2;
        })
    });
    return [cross_, std_dt, crs];
}

async function GenSummaryTbl(classno, term, calcflag = true, updateflag = false) {
    let data = await GetMrkTblSet(classno, new TMarkCalC_Act(), true, true)
    if (term == 5) return cross_tbl_SecTerm(...data);
    return cross_tbl(...data);
}

async function GetMrkTblSet(classno, iCalc = null, calcflag = true, updateflag = false) {
    let std_dt = await getModel().DB_reader(formatString("SELECT stud_ref,dsej_ref,curr_class,curr_seat,c_name,e_name,del_flag from studinfo where curr_class='{0}' order by curr_seat", classno));
    //console.table(std_dt.slice(0, 2))
    let crs_dt = await getModel().DB_reader(formatString("SELECT course_d_id,courseName,c_T_type,c_field,groupid,tab,rate,c_ng_id FROM eschool.mrs_course_detail where classno ='{0}' order by groupid,tab;", classno));
    //console.log(crs_dt.length)
    //console.table(crs_dt.slice(0,10))
    let ng_dict = {};
    const [year, ngdr] = await getModel().DB_reader("SELECT session_desc FROM  `mrs_session_def` where curr_flag=1;select NG_ID,NG from ngrade_table");
    ngdr.forEach(elm => ng_dict[elm.NG_ID] = elm.NG);
    //console.log(year)
    //console.table(ng_dict)
    let subsql = [
        "SELECT stud_ref,GROUP_CONCAT(pingyu1 ORDER BY Lineno SEPARATOR '') as py1,GROUP_CONCAT(pingyu2 ORDER BY Lineno SEPARATOR '') as py2,GROUP_CONCAT(pingyu3 ORDER BY Lineno SEPARATOR '') as py3 FROM mrs_pingyu where classno='{0}' group by stud_ref order by seat;",
        "SELECT stud_ref,wrg_later1,wrg_absence1,wrg_truancy_t1,wrg_truancy_s1,WrgMarks1,honor1,SE_HONOR1,wrg_later2,wrg_absence2,wrg_truancy_t2,wrg_truancy_s2,WrgMarks2,honor2,SE_HONOR2,wrg_later3,wrg_absence3,wrg_truancy_t3,wrg_truancy_s3,WrgMarks3,honor3,SE_HONOR3,conduct1,conduct2,conduct3,conduct,mark1,mark2,mark3,mark,ran1,ran2,ran3,ran,total_crs_ncp,voca_cult_avg,voca_cult_avg1,voca_cult_avg2,voca_cult_avg3,voca_prof_avg,voca_prof_avg1,voca_prof_avg2,voca_prof_avg3,voca_cult_mue,voca_prof_mue,SchoolEval1,SchoolEval2,SchoolEval3,volunteer_hr,allpass1,allpass2,allpass3 FROM mrs_stud_conduct where classno='{0}';",
        "SELECT a.stud_c_id,a.stud_ref,a.course_d_id,a.e1,a.t1,a.e2,a.t2,a.e3,a.t3,a.total1,a.total2,a.total3,a.sub_c_p,a.total,a.pk,a.P_X,a.VOCA_MUE,a.eog, coursename,c_t_type,groupid,tab,c_ng_id,rate FROM mrs_stud_course a left join mrs_course_detail b on a.course_d_id=b.course_d_id where a.classno='{0}' and b.classno='{0}' order by a.stud_ref,b.groupid,b.tab;",
        "SELECT stud_ref,activeName,grade1,grade2,grade3,grade,subXF,addXF,bk,act_py FROM mrs_stud_active where classno='{0}';",
        "SELECT stud_ref,GC_Name,grade1,grade2,grade3 FROM mrs_stud_grade_course where classno='{0}' order by cgid"
    ].join("");
    let dt = await getModel().DB_reader(formatString(subsql, classno, classno, classno, classno, classno, classno));
    //console.log(dt.forEach((element,idx) => {console.log(idx); console.log(subtbNs[idx]);console.table(element.slice(0,2))}))
    let ds = [];
    for (let std of std_dt) {
        let row = {
            "std": std.stud_ref,
            "info": std,
            "py": dt[0].filter(r => r.stud_ref == std.stud_ref),
            "cd": dt[1].filter(r => r.stud_ref == std.stud_ref),
            "mk": dt[2].filter(r => r.stud_ref == std.stud_ref),
            "ac": dt[3].filter(r => r.stud_ref == std.stud_ref),
            "gc": dt[4].filter(r => r.stud_ref == std.stud_ref),
        }
        ds.push(row)
    }
    if (calcflag) {
        MarkIterateCalc(ds, ng_dict, iCalc)
        if (updateflag) {
            mk_adpt_Update(ds, "mk");
            cd_adpt_Update(ds, "cd");
        }
    }
    fs.writeFileSync('ds.txt', JSON.stringify(ds));
    fs.writeFileSync('ng_dict.txt', JSON.stringify(ng_dict));
    fs.writeFileSync('crs_dt.txt', JSON.stringify(crs_dt));
    fs.writeFileSync('std_dt.txt', JSON.stringify(std_dt));
    return [std_dt, crs_dt, ng_dict, ds];
}

//////////////////////////
module.exports = {
    HttpGet_pyapi: HttpGet_pyapi,
    Uploadfile: Uploadfile,
    Dowanloadfile: Dowanloadfile,
    GenSummaryTbl: GenSummaryTbl,
}

GenSummaryTbl('SC1E', 1);

