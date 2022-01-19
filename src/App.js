import './App.css';
import {useEffect, useState} from "react";

function conversion({from, value, to}){

  if(from === to){
    return value;
  }

  const definition = {
      mm: {
         name: "Millimeter",
         system: "metric",
         to_base: 1e-3,
      },
      cm: {
        name: "Centimeter",
        system: "metric",
        to_base: 1e-2,
      },
      m: {
        name: "Meter",
        system: "metric",
        to_base: 1,
      },
      km: {
        name: "Kilometer",
        system: "metric",
        to_base: 1e3,
      },
      mi: {
        name: "Mile",
        system: "imperial",
        to_base: 5280,
      },
      yd: {
        name: "Yard",
        system: "imperial",
        to_base: 3,
      },
      ft: {
        name: "Foot",
        system: "imperial",
        to_base: 1,
      },
      in: {
        name: "Inch",
        system: "imperial",
        to_base: 1 / 12,
      },
      systems:{
         metric: 3.28084,
         imperial: 1 / 3.28084
      }
  };

  /* Convert to the base of unit system */
  let val = value * definition[from].to_base;

  /* Convert between systems if not same system */
  if(definition[from].system !== definition[to].system){
    val *= definition.systems[definition[from].system];
  }

  /* Convert back to original unit */
  return val / definition[to].to_base;
}

function UnitsSelector({...rest}) {
  return <select {...rest}>
    <option value="mm">Millimeter</option>
    <option value="cm">Centimeter</option>
    <option value="m">Meter</option>
    <option value="km">Kilometer</option>
    <option value="mi">Mile</option>
    <option value="yd">Yard</option>
    <option value="ft">Foot</option>
    <option value="in">Inch</option>
  </select>;
}

function App() {

  const [units, setUnits] = useState({
    value: 0,
    from: 'mm',
    to: 'mm'
  });

  const [result, setResult] = useState(null);

  useEffect(()=>{
    setResult(conversion(units));
  }, [units])

  return (
    <>
      <div className="bg-slate-300 p-5">
        <h1>Distance Converter</h1>
      </div>
      <div className="bg-slate-100 p-5">
        <form>
          <div className="flex space-x-5 items-center">
            <p className='pb-2'>I want to convert</p>
            <input onChange={(e)=> setUnits({...units, value: Number(e.target.value)})}/>
            <UnitsSelector onChange={(e)=> setUnits({...units, from:e.target.value})}/>
            <p>to</p>
            <UnitsSelector onChange={(e)=> setUnits({...units, to:e.target.value})}/>
          </div>
        </form>
      </div>
      <div className="bg-slate-100 p-5 flex space-x-3 items-center">
        {result ?
            (
              <>
                <p>Result:</p>
                <p className="px-3 border border-slate-500 bg-slate-400 text-white font-bold">{result} {units.to}</p>
              </>
            ) :  null
        }
      </div>
    </>
  );
}

export default App;
