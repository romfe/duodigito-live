//importação de bibliotecas
import { useState } from "react";
import { css } from "@emotion/css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//importação de componentes da aplicação
import api from "./api/apiCalculo";
import { EntradaDados } from "./components/EntradaDados";
import { Historico } from "./components/Historico";

interface InterfaceHistorico {
  solucao: number;
  numeroInicial: number;
  tempoExecucao: number;
}

function App() {
  // estado para armazenar o histórico de consultas do usuário
  const [historicoDeCalculos, setHistoricoDeCalculos] = useState<
    InterfaceHistorico[]
  >([]);

  // variável que armazena o máximo de consultas permitidas pelo usuário por sessão
  const numeroMaximoDeConsultas: number = 30;

  // função que envia os dados à api e adiciona a resposta à constante historicoDeCalculos
  // também verifica o número informado pelo usuário e exibe mensagens de erro
  const enviarDados = async (numero: number) => {
    if (numero > 100) {
      if (historicoDeCalculos.length >= numeroMaximoDeConsultas) {
        toast.error(
          "Número máximo de consultas atingido. Atualize a página e tente novamente"
        );
      } else {
        try {
          const response = await api.get(`/calculo?input=${numero}`);
          const existeSolucao: InterfaceHistorico = response.data;

          if (existeSolucao.solucao === 0) {
            // caso a API não tenha encontrado solução, retorna o valor 0
            // a mensagem de erro é exibida ao usuário
            toast.error(
              "Não foi encontrada solução. Verifique o número informado"
            );
          } else {
            // caso a API retorne um valor válido, a nova resposta é armazenada
            setHistoricoDeCalculos([...historicoDeCalculos, response.data]);
            toast.success(`O menor múltiplo duodígito é ${existeSolucao.solucao}`);
          }
        } catch (error) {
          toast.error("Erro na comunicação com o servidor.");
        }
      }
    } else {
      toast.error("Por favor insira um número maior do que 100.");
    }
  };

  return (
    <main className={styles.container}>

      {/*Seção da entrada de dados*/}
      <section className={styles.calculoSection}>
        <div className={styles.groupContainer}>
          <h2>Cálculo Duodígito</h2>
          <EntradaDados enviarDadosHandler={enviarDados} />
        </div>
      </section>

      {/*Seção do histórico de consultas*/}
      <section className={styles.historicoSection}>
        <div className={styles.groupContainer}>
          <h2>Histórico</h2>
          <Historico historico={historicoDeCalculos} />
        </div>
      </section>

      <ToastContainer />
    </main>
  );
}

const styles = {
  container: css`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;

    @media (max-width: 720px) {
      flex-direction: column;
    }
  `,

  calculoSection: css`
    width: 50vw;
    background: #0099ff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 720px) {
      width: 100vw;
      height: 50vh;
    }
  `,

  historicoSection: css`
    width: 50vw;
    background: #fff;
    display: flex;
    margin-top: 50px;
    align-items: center;
    flex-direction: column;

    @media (max-width: 720px) {
      width: 100vw;
      height: 50vh;
    }
  `,

  groupContainer: css`
    max-width: 80%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  `,
};

export default App;