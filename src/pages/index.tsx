import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{marginLeft: '1rem'}}
            href="https://github.com/daily3014/rbx-cryptography">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="The fastest cryptography library for Roblox. Pure Luau implementations of SHA-2, SHA-3, BLAKE, ChaCha20-Poly1305, AES-GCM, Ed25519, X25519, and more.">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem 0'}}>
          <div className="row">
            <div className="col col--4">
              <h3>Comprehensive</h3>
              <p>SHA-2, SHA-3, BLAKE, HMAC, ChaCha20-Poly1305, AES-GCM, Ed25519, X25519, ML-DSA, ML-KEM, and more.</p>
            </div>
            <div className="col col--4">
              <h3>Fast</h3>
              <p>Optimized for Luau with native compilation support. The fastest pure-Luau crypto library available.</p>
            </div>
            <div className="col col--4">
              <h3>Secure</h3>
              <p>Constant time operations where feasible. Builtin CSPRNG. Postquantum algorithms included. Wycheproof tests included.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}