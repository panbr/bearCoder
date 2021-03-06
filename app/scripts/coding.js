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
        });

        // ctrl + Enter
        $(document).keyup(event => { 
            if(event.ctrlKey && event.keyCode === 13) { 
                this._run();
            } 
        });
    }

    _run() {
        let prog = document.getElementById("code").value;
        console.log("...", prog);
        let mypre = document.getElementById("output");
        mypre.innerHTML = '';
        Sk.pre = "output";
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
        Sk.configure({ output: this._outf, read: this._builtinRead });

        let mp = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });
        mp.then((mod) => {
            console.log('success');
        }, (err) => {
            mypre.innerHTML = err.toString();
            console.error(err.toString());
        });
    }

    _builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    _outf(text) { 
        let mypre = document.getElementById("output"); 
        mypre.innerHTML = mypre.innerHTML + text; 
    }
}

$(function() {
    let coding = new Coding();
})
