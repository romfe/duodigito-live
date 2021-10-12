import { useState } from "react";
import { css } from "@emotion/css";

interface EntradaDadosProps {
  enviarDadosHandler: (numeroEntrada: number) => void;
}

export const EntradaDados = (props: EntradaDadosProps) => {
  const [numeroDeEntrada, setNumeroDeEntrada] = useState(0);

  const changeNumeroHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumeroDeEntrada(parseFloat(event.target.value));
  };

  const executarComEnter = (keyboardEvent: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyboardEvent.key === 'Enter') {
      enviarDados();
    }
  }

  const enviarDados = () => {
    props.enviarDadosHandler(numeroDeEntrada);
  };

  return (
    <>
      <input
        type="number"
        id="numero"
        name="numero"
        onChange={changeNumeroHandler}
        onKeyDown={executarComEnter}
        placeholder="Digite um número"
        className={styles.input}
      />
      <button
        onClick={enviarDados}
        className={styles.button}
      >
        Enviar
      </button>
    </>
  );
};

const styles = {
  input: css`
    margin-top: 2rem;
    padding: 0 1.5rem;
    height: 3rem;
    border-radius: 0.25rem;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;
    &::placeholder {
      color: #969cb3;
    }
  `,
  button: css`
    padding: 0.25rem;
    width: 7rem;
    height: 3rem;
    background: #5429cc;
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.5s;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  `,
};