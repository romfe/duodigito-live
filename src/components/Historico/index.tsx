// importação das bibliotecas
import { css } from '@emotion/css';

interface InterfaceHistorico {
  solucao: number,
  numeroInicial: number,
  tempoExecucao: number
}

interface HistoricoProps {
  historico: InterfaceHistorico[]
}

export const Historico = (props: HistoricoProps) => {

  return (

    // tabela do histórico de consultas
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Número</td>
          <td>Múltiplo Duodígito</td>
          <td>Tempo (em nanossegundos)</td>
        </tr>
      </thead>

      <tbody>
        {props.historico.map((operacao: InterfaceHistorico, index) =>
          <tr key={index}>
            <td>{operacao.numeroInicial}</td>
            <td>{operacao.solucao}</td>
            <td>{operacao.tempoExecucao}</td>
          </tr>
        )}
      </tbody>

    </table>
  );
}

const styles = {
  table: css`
    margin-top:0;
    border-spacing: 0 0.5rem;
    tr{
      color:#363F5F;
      font-weight:400;
      padding: 1rem 2rem;
      text-align:center;
      line-height:1.5rem;
    }
    td{
      padding: 1rem 2rem;
      border:0;
      background: #FFFFFF;
      color:#363F5F;
      border-radius:.25rem;
      text-align:center;
    }
`}