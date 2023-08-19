import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [result, setResult] = useState(" = 0")
  const [quotes, setQuotes] = useState([]);

  const [numbers, setNumbers] = useState({
    numberA: 0,
    operator: "+",
    numberB: 0,
  })

  const handleSetNumbers = (key) => (event) => {
    if (key === 'O') {
      var op = event.target.value;
      setNumbers(numbers => ({
        ...numbers,
        ...{ operator: op }
      }));
    } else {
      var num = parseFloat(event.target.value);
      if (key === 'A') {
        setNumbers(numbers => ({
          ...numbers,
          ...{ numberA: num }
        }));
      } else {
        setNumbers(numbers => ({
          ...numbers,
          ...{ numberB: num }
        }));
      }
    }
  }

  useEffect(() => {
    setResult(" = " + (
      numbers.operator === "+" ? (numbers.numberA + numbers.numberB) :
        numbers.operator === "-" ? (numbers.numberA - numbers.numberB) :
          numbers.operator === "*" ? (numbers.numberA * numbers.numberB) :
            numbers.operator === "/" ? (numbers.numberA / numbers.numberB) :
              numbers.operator === "^" ? (numbers.numberA ^ numbers.numberB) :
                numbers.operator === "%" ? (numbers.numberA % numbers.numberB) : "?"
    ));
  }, [numbers]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://strapi-rygs.onrender.com/api/quotes");
      setQuotes(res.data.data);
    }

    fetchData();
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <hr />

      <h1>Calc + Ulator</h1>
      <form className="card">
        <input type="text" value={numbers.numberA}
          onChange={handleSetNumbers('A')} /><br />
        <input type="text" value={numbers.operator}
          onChange={handleSetNumbers('O')} /><br />
        <input type="text" value={numbers.numberB}
          onChange={handleSetNumbers('B')} /><br />
        <input type="text" value={result} readOnly />
        <p>
          Hi! My name is <code>Robert</code> <code>Antonius</code>.
          Use <code>+</code> , <code>-</code> , <code>*</code> , <code>/</code> , <code>^</code> , or <code>%</code> . <br />
          Entah ngapo, yg operatorny kadang ngelag, dk biso diubah kecuali kalo kito block ke isiny dan ganti character laen. <br />
          Kadang jg harus ubah nomor 1 ato nomor 2 dulu bru dio te update. Aku samo sekali dk tw ngapo, klo ad yg tw biso tulis di <code>Issue</code>. <br />
          Edit: Thx atas bantuanny. Ak dtw klo React jugo biso manggil array pake array.key. Setelah ak ubah ke format it glo <br />
          biso bru edit smoothless. Cakny sih karena ak pake system array[stringkey] dio kadang ad delay dan dk pas editny. Ak pikir mungkin <br />
          keren soalny kemaren klo ak biso ubah it func it biar biso universal, tpi akhirny malah ribet. <br />
        </p>
      </form>

      <hr />

      <h1>API + Mapping</h1>
      <div>
        {quotes.map((quote, index) => {
          return (
            <div key={index}>
              "{quote.attributes.Quote}.."
              <br />
              - {quote.attributes.Author}
              <br />
            </div>
          )
        })}
        <p>
          P.S. Entah ngapo yg React ak hrus tarok return(element) biar biso tampil. Klo tebakan ak <br />
          si karna map it masih termasuk function dan (entah ngapo, beda dri yg lain) dk otomatis <br />
          ngebalekke nilai.
        </p>
      </div>

      <hr />

      <ul className="read-the-docs">
        References:
        <li><a href='https://stackoverflow.com/questions/51576155/pass-a-variable-reference-in-react'>Trick to change default set behaviour</a></li>
        <li><a href='https://react.dev/learn/thinking-in-react'>Input and OnChange</a></li>
        <li><a href='https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component'>Multiple useEffect</a></li>
      </ul>
    </>
  )
}

export default App
