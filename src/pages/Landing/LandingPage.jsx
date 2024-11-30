import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './LandingPage.module.css';
import { FaChartLine, FaLock, FaMobileAlt, FaWhatsapp } from 'react-icons/fa';

const handleScroll = (event) => {
  event.preventDefault(); // Impede o comportamento padrão do link
  const targetId = event.currentTarget.getAttribute('href').substring(1);
  const target = document.getElementById(targetId);
  const offset = parseInt(event.currentTarget.getAttribute('data-offset'), 10) || 100;

  if (target) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};


const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Abreu's Financial | Gestão Financeira Profissional</title>
        <meta name="description" content="Sistema de gestão financeira profissional. Controle suas finanças pessoais, investimentos e despesas com nossa plataforma intuitiva." />
        <meta name="keywords" content="gestão financeira, controle financeiro, finanças pessoais, investimentos, planejamento financeiro, educação financeira, controle de gastos, orçamento pessoal" />
        <meta property="og:title" content="Abreu's Financial - Sua Solução em Gestão Financeira" />
        <meta property="og:description" content="Transforme sua vida financeira com nossa plataforma completa de gestão financeira." />
      </Helmet>

      <nav className={styles.navbar}>
        <div className={styles.logo}>Abreu's Financial</div>
        <div className={styles.navLinks}>
        <a href="#features" data-offset="180" onClick={handleScroll}>Funcionalidades</a>
        <a href="#pricing" data-offset="50" onClick={handleScroll}>Preços</a>
          <a href="/" className={styles.loginButton}>Login</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Transforme Sua Vida Financeira</h1>
          <p>A plataforma mais completa para gestão financeira pessoal e profissional</p>
          <div className={styles.ctaButtons}>
            <a href="/sign-up" className={styles.primaryButton}>
              Comece Grátis
              <span className={styles.buttonSubtext}>2 dias de teste</span>
            </a>
            <a 
              href="https://wa.me/62993773456" 
              className={styles.whatsappButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Fale Conosco
            </a>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 id="features" className={styles.featuresTitle}>Funcionalidades Principais</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaChartLine className={styles.icon} />
            <h3>Dashboard Inteligente</h3>
            <p>Visualize seus dados financeiros em tempo real com gráficos interativos</p>
          </div>
          <div className={styles.featureCard}>
            <FaLock className={styles.icon} />
            <h3>Segurança Avançada</h3>
            <p>Seus dados protegidos</p>
          </div>
          <div className={styles.featureCard}>
            <FaMobileAlt className={styles.icon} />
            <h3>Acesso Mobile</h3>
            <p>Gerencie suas finanças de qualquer lugar, a qualquer momento</p>
          </div>
        </div>
      </section>
      {/*
      <section className={styles.statistics}>
        <div className={styles.statItem}>
          <h3>+1000</h3>
          <p>Usuários Ativos</p>
        </div>
        <div className={styles.statItem}>
          <h3>98%</h3>
          <p>Satisfação</p>
        </div>
        <div className={styles.statItem}>
          <h3>24/7</h3>
          <p>Suporte</p>
        </div>
      </section>
      */}
      <section id="pricing" className={styles.pricing}>
        <h2>Planos e Preços</h2>
        <div className={styles.pricingCards}>
          <div className={styles.pricingCard}>
            <h3>Premium</h3>
            <div className={styles.price}>
              <span className={styles.currency}>R$</span>
              <span className={styles.amount}>29</span>
              <span className={styles.period}>/mês</span>
            </div>
            <ul className={styles.features}>
              <li>Dashboard Completo</li>
              <li>Relatórios Ilimitados</li>
              <li>Suporte Prioritário</li>
              <li>Backup em Nuvem</li>
              <li>Múltiplas Categorias</li>
            </ul>
            <a href="/sign-up" className={styles.primaryButton}>Começar Agora</a>
          </div>
        </div>
      </section>
      {/*
      <section className={styles.credentials}>
        <h2>Por que nos escolher</h2>
        <div className={styles.credentialGrid}>
          <div className={styles.credentialCard}>
            <h4>Segurança Bancária</h4>
            <p>Proteção de dados com padrão financeiro</p>
          </div>
          <div className={styles.credentialCard}>
            <h4>Suporte Especializado</h4>
            <p>Equipe dedicada ao seu sucesso</p>
          </div>
          <div className={styles.credentialCard}>
            <h4>Tecnologia Avançada</h4>
            <p>Sistemas atualizados e confiáveis</p>
          </div>
        </div>
      </section>
      */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Abreu's Financial</h4>
            <p>Sua solução completa para gestão financeira</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Contato</h4>
            <p>abreus.enterprise@gmail.com</p>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2024 Abreu's Financial. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
