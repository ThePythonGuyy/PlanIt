import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import styles from './root.module.scss'


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className={styles.container}>
        <Header />
        <div className={styles.main}>{children}</div>
        <Footer />
      </section>
    );
  }
  