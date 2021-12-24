import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(undefined);

  const calculateBMI = useCallback(() => {
    const floatHeight = parseFloat(height);
    const floatWeight = parseFloat(weight);
    const squaredHeight = floatHeight * floatHeight;
    const bmi = Math.round(floatWeight / squaredHeight);
    setBmi(bmi);
  }, [height, weight]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    calculateBMI();
  }, [calculateBMI]);

  const handleHeightInputChange = useCallback((event) => {
    const { target } = event;
    setHeight(target.value);
  }, []);

  const handleWeightInputChange = useCallback((event) => {
    const { target } = event;
    setWeight(target.value);
  }, []);

  const groups = useMemo(() => {
    return [
      {
        key: 'group-1',
        title: 'Abaixo do peso',
        subtitle: 'Inferior a 19'
      },
      {
        key: 'group-2',
        title: 'Normal',
        subtitle: '19 ~ 25'
      },
      {
        key: 'group-3',
        title: 'Acima do peso',
        subtitle: '26 ~ 29'
      },
      {
        key: 'group-4',
        title: 'Obeso',
        subtitle: '30 ou superior'
      }
    ]
  }, []);

  const groupsMap = groups.map((group) => {
    return (
      <div key={group.key} className={styles.group}>
        <p className={styles.groupTitle}>{group.title}</p>
        <p className={styles.groupSubtitle}>{group.subtitle}</p>
      </div>
    );
  })


  return (
    <div className={styles.container}>
      <Head>
        <title>Calculadora de IMC</title>
        <meta name="description" content="Calculadora de índice de massa corporal IMC" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Calculadora de IMC
        </h1>
        <p className={styles.description}>
          O índice de massa corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal, é determinado pela divisão do peso do indivíduo pelo quadrado de sua altura, em que a massa está em quilogramas e a altura em metros.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="height">Altura em metros <span className={styles.example}>(Exemplo: 1,80)</span></label>
            <input className={styles.input} id="height" type="text" onChange={handleHeightInputChange} value={height} required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="weight">Peso em quilos <span className={styles.example}>(Exemplo: 70)</span></label>
            <input className={styles.input} id="weight" type="text" onChange={handleWeightInputChange} value={weight} required />
          </div>
          <button className={styles.buttonSubmit} type="submit">Calcular</button>
        </form>

        {!!bmi && (
          <div className={styles.result}>
            <p className={styles.bmi}>O seu IMC é <b>{bmi}</b></p>
            <p className={styles.bmiGroup}>Normal</p>
            <div className={styles.groups}>
              {groupsMap}
            </div>
          </div>
        )}

      </main>

      <footer className={styles.footer}>
        <p>Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Home;
