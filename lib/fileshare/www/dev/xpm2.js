/* xpm2

Using jsbmp, create a bitmap based on the X PixMap v2 format

Copyright (c) 2009 Sam Angove <sam [a inna circle] rephrase [period] net>

License: MIT

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
Convert an X PixMap v2 format image to a bitmap.

See: http://en.wikipedia.org/wiki/X_PixMap

Headers are ignored and only colour type 'c' is supported.

Example (2x2 grid):

    a c #000000
    b c #ffffff
    ba
    ab
*/
function xpm2_rgb(s) {
    var lines = s.split(/\r?\n/);
    console.log(lines)
    // ignore the header if we get it
    if (lines[0].match(/XPM/)) {
        lines.shift();
        lines.shift();
    }
    var col;
    var charmap = {};
    while (true) {
        col = lines.shift().split(" ");
        if (col.length == 1) {
            lines.unshift(col[0]);
            break;
        }
        // col[1] should always be "c" -- at least, we're
        // not supporting anything else
        charmap[col[0]] = col[2].substr(1, 6);
    }
    var pixels = [], i, j, line;
    var height = lines.length;
    var width = lines[0].length;
    for (i=height-1; i!=-1; --i) {
        line = lines.pop();
        for (j=0; j<width; ++j) {
            pixels.push(charmap[line.substr(j, 1)])
        }
    }
    return bmp_rgb(width, height, pixels);
}