
class Sudoku {
    constructor(code = undefined) {

        this.solved = code ? code : `
            534678912
            672195348
            198342567
            859761423
            426853791
            713924856
            961537284
            287419635
            345286179`;

        this.board = `
            000000000
            000000000
            000000000
            000000000
            000000000
            000000000
            000000000
            000000000
            000000000`;

        this.solved = this.solved.trim().replaceAll(" ", "").replaceAll("\n", "").split('');    
        this.board = this.board.trim().replaceAll(" ", "").replaceAll("\n", "").split('');
        this.createBoard();

    }

    createBoard(level = 5) {
        for (let i = 0; i < this.solved.length; i++) {
            let rand = Math.floor(Math.random() * 10 + 1)
            this.board[i] = (rand >= level && rand <= 10) ? `${this.solved[i]}` : `0`;
        }
    }

    rows() {
        let rows = [];
        let index = 0;
        for (let i = 0; i < 9; i++) {
            let row = []
            for (let j = 0; j < 9; j++) {
                row.push(parseInt(this.board[index]));
                index++;
            }
            rows.push(row);
        }
        return rows;
    }

    cols() {
        let cols = [];
        let rows = this.rows();
        for (let i = 0; i < 9; i++) {
            let col = []
            for (let j = 0; j < 9; j++) {
                col.push(parseInt(rows[j][i]));
            }
            cols.push(col);
        }
        return cols;
    }

    validate() {
        let valid = "123456789"
            .split('')
            .map(item => parseInt(item))
            .reduce((total, item) => total + item);
        
        for (let col of this.cols()) {
            let filtered = col.filter((item, index) => {
                return col.indexOf(item) == index;
            });
            if (filtered.length != 9) return false
            if (col.reduce((total, item) => total + item) != valid) 
                return false
        }
        
        for (let row of this.rows()) {
            let filtered = row.filter((item, index) => {
                return row.indexOf(item) == index;
            });
            if (filtered.length != 9) return false
            if (row.reduce((total, item) => total + item) != valid) 
                return false
        }
        
        return true
    }

    debug() {
        console.log(this.board)
    }

    draw(container = undefined) {
        if (this.board.length != 81) {
            console.log("BAD SUDOKU");
            return;
        }
    
        let table = container || document.getElementById('sudoku-table');
        table.innerHTML = "";
        let index = 0;
        for(let i = 0; i < 9; i++) {
            let row = document.createElement('tr');
            table.appendChild(row);
            
            for (let j = 0; j < 9; j++) {
                let col = document.createElement('td');
                let input = document.createElement('input');
                col.appendChild(input);
                if ((j+1) % 3 == 0 && j != 8) col.className = "border-vertical";
                if ((i+1) % 3 == 0 && i != 8) col.className += " border-horizontal";
                input.setAttribute("ref", index);
                input.setAttribute("type", "number");
                input.setAttribute("min", "1");
                input.setAttribute("max", "9");
                input.addEventListener('change', () => {
                    this.board[parseInt(input.getAttribute("ref"))] = input.value;
                    this.validate();
                });
    
                if (this.board[index] != 0) {
                    input.setAttribute("readonly", "");
                    input.value = this.board[index];
                }
                row.appendChild(col);
                index++;
            }
        }
        return table;
    }
}

let sudoku = new Sudoku();

window.addEventListener("DOMContentLoaded", () => {
    
    let mounted = sudoku.draw()

    let btn = document.getElementById("btnValida");
    let level = document.getElementById("level");
    level.value = 5;
    let levelValue = document.getElementById("textLevel");

    level.addEventListener('change', (ev) => {
        levelValue.textContent = ev.target.value;
        console.log(ev.target.value);
        sudoku.createBoard(ev.target.value);
        mounted = sudoku.draw();
    })

    btn.addEventListener('click', () => {
        if (sudoku.validate()) {
            mounted.className = "valid";
        } else {
            mounted.className = "invalid";
            setTimeout(() => {
                mounted.className = "";
            }, 2000)
        }
    });
})

let getTemplate = (code) => {
    return code.trim().replaceAll(" ", "").replaceAll("\n", "").split('');
}

let sudokus = [
    {
        template: `
        534678912
        672195348
        198342567
        859761423
        426853791
        713924856
        961537284
        287419635
        345286179`,
        done: false
    },
    {
        template: `
        435269781
        682571493
        197834562
        826195347
        374682915
        951743628
        519326874
        248957136
        763418259`,
        done: false
    },
    {
        template: `
        123678945
        584239761
        967145328
        372561589
        691583274
        458792613
        836924157
        219857436
        745316892`,
        done: false
    },
    {
        template: `
        276314958
        854962713
        913875264
        468127395
        597438621
        132596487
        325789146
        641253879
        789641532`,
        done: false
    }
];