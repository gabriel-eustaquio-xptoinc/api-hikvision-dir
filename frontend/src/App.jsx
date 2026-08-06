import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function desbloquearPorta() {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/desbloquear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao desbloquear");
      }

      const data = await response.text();

      console.log(data);
      alert("Porta desbloqueada!");
    } catch (error) {
      console.error(error);
      alert("Erro ao desbloquear a porta.");
    }
  }

  return (
    <>
      <button className="btn-porta" onClick={desbloquearPorta}>Ok</button>
    </>
  )
}

export default App
