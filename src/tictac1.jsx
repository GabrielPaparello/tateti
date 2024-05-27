import { useEffect } from "react";
import "./tik.css";

function TicTacToe(props) {
  useEffect(() => {
    let turn1 = "X";
    const cols = 3;
    const rows = 3;
    let board = new Array(cols);
    let winner;
    let moves = 0;

    // Create a 2D array for the game representation
    for (let i = 0; i < cols; i++) {
      board[i] = new Array(rows);
    }

    // Assign IDs to each element
    const elementsArray = document.querySelectorAll(".box");
    elementsArray.forEach(function (div, index) {
      div.setAttribute("id", index);
    });

    // Logic for switching turns
    function turn(div) {
      if (turn1 === "X") {
        turn1 = "O";
      } else if (turn1 === "O") {
        turn1 = "X";
      }
    }

    // Handling clicks and bugs
    elementsArray.forEach(function (div) {
      div.classList.add("show");
      div.addEventListener("click", function () {
        if (div.textContent === "") {
          div.textContent = turn1;
          div.value = div.textContent;
          moves++;
          console.log(moves);
          checkin(div, turn1);
          win(board);
          turn(div);
          checkWinner();
        }
      });
    });

    // Logic for winning
    function checkWinner() {
      // Check if there is a winner or a draw
      if (winner === "X") {
        document.getElementById("p1").classList.remove("hidden");
        document.getElementById("p1").classList.add("active");
        document.querySelectorAll(".box").forEach(function (div) {
         
          div.classList.remove("show");
          turn1 = "";
        });
      }

      if (winner === "O") {
        document.getElementById("p2").classList.remove("hidden");
        document.getElementById("p2").classList.add("active");
        document.querySelectorAll(".box").forEach(function (div) {
          div.classList.remove("show");
          turn1 = "";
        });
      }
      if (moves === 9 && winner === "") {
        document.getElementById("draw").classList.remove("hidden");
        document.getElementById("draw").classList.add("active");
        document.querySelectorAll(".box").forEach(function (div) {
          div.classList.remove("show");
          turn1 = "";
        });
      }
    }

    // Restart the game
    document.getElementById("reset").addEventListener("click", function () {
      document.querySelectorAll(".box").forEach(function (div) {
        div.textContent = "";
        document.getElementById("p1").classList.add("hidden");
        document.getElementById("p1").classList.remove("active");
        document.getElementById("p2").classList.add("hidden");
        document.getElementById("p2").classList.remove("active");
        document.getElementById("draw").classList.add("hidden");
        document.getElementById("draw").classList.remove("active");
        turn1 = "X";
        winner = "";
        moves = 0;
        board = new Array(cols);
        for (let i = 0; i < cols; i++) {
          board[i] = new Array(rows);
        }
      });
    });

    function checkin(div, turn1) {
      let id = div.id;
      if (id < 3) {
        board[0][id] = turn1;
      }
      if (id > 2 && id < 6) {
        board[1][id - 3] = turn1;
      }
      if (id > 5) {
        board[2][id - 6] = turn1;
      }
    }

    function win(board) {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2] &&
          board[i][0] !== ""
        ) {
          winner = board[i][0];
          return winner;
        }
      }

      // Check columns
      for (let i = 0; i < 3; i++) {
        if (
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i] &&
          board[0][i] !== ""
        ) {
          winner = board[0][i];
          return winner;
        }
      }

      // Check diagonals
      if (
        (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0])
      ) {
        if (board[1][1] !== "") {
          winner = board[1][1];
          return winner;
        }
      }

      return null; // Return null if there's no winner yet
    }
  }, []);

  return (
    <div className="modalWrap">
      <div className="text-center">
        <h1 className="text-3xl mt-16">A simple Tic Tac Toe </h1>
        <h2 className="text-xl">Made in Vanilla Js</h2>
      </div>
      <div className="container2">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div>
        <h2 id="p1" className="hidden text-lg font-semibold">
          Player 1 has won
        </h2>
        <h2 id="p2" className="hidden text-lg font-semibold">
          Player 2 has won
        </h2>
        <h2 id="draw" className="hidden mt-2 text-lg font-semibold">
          Draw
        </h2>
        
        <button
          id="reset"
          className="bg-red-500 text-teal-50 w-20 rounded border-2 border-black shadow-md shadow-orange-100"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
