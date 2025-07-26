import { ChangeEventHandler, useEffect, useState } from "react";
import { requestData } from "./numberApi";
import { options } from "./config";
import './style.css'
import { isValidInput } from "./utils/validation";

function App() {
  const [text, setText] = useState<string | undefined>('');
  const [variant, setVariant] = useState(options[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [enterNumber, setEnterNumber] = useState('1')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const updateData = async () => {
        setIsLoading(true);
        try {
          if (!isRandom && !isValidInput(variant, enterNumber)) {
            setText('The number must be in the form of a digit');
            return;
          }
          else if (isRandom) {
            const newText = await requestData(`random/${variant.toLowerCase()}`);
            setText(newText);
          } else {
            const newText = await requestData(
              `${enterNumber === '' ? '1' : enterNumber}/${variant.toLowerCase()}`
            );
            setText(newText);
          }

        } catch (error) {
          setText('Error data get');
        } finally {
          setIsLoading(false);
        }
      };

      updateData();
    }, 500);

    return () => clearTimeout(timeout);

  }, [enterNumber, isRandom, variant])

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setVariant(event.target.value)
  }

  const handleRandom = () => {
    setIsRandom(!isRandom)
  }

  const handleChangeNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnterNumber(event.target.value)
  }

  return (
    <div
      className="block"
    >
      <div className="block__choice">
        <select onChange={handleChange} className="block__select">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className="block___checkbox checkbox">
          <input
            type="checkbox"
            checked={isRandom}
            className="checkbox__flag"
            onChange={handleRandom}
            id="checkbox"
          />
          <label htmlFor="checkbox"
            className="checkbox__label"
          >Random</label>
        </div>

        <div className="block__input">
          <input
          className="input"
          placeholder={`${variant === 'Date' ? "Enter date for example 1/18..." : 'Enter number...'}`}
          value={enterNumber}
          onChange={handleChangeNumber} />
        </div>
      </div>
      <div className="block__text text">
        <span className="">{isLoading ? 'Loading...' : text}</span>
      </div>
    </div>

  );
}

export default App;
