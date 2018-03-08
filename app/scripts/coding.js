/**
 * coding
 */
class Coding {
    constructor() {
        this._init();
    }

    _init() {
        $('#run').click(() => {
            this._run();
        })
    }

    _run() {
        let prog = $("#code").val();
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'result';
        Sk.configure({ read: this._builtinRead });
        let mp = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });
        mp.then((mod) => {
            console.log('success');
        }, (err) => {
            console.error(err.toString());
        });
    }

    _builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }
}

$(function() {
    let coding = new Coding();
})
