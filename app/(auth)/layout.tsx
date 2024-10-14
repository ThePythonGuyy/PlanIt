
import Image from 'next/image';
import styles from './auth.module.scss'



export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className={styles.container}>
        <div className={styles.signInImgContainer}>
          <Image src='/assets/images/signInImg.png' alt='signInImg' fill />
 
        </div>

        <div className={styles.main}>{children}</div>
  
      </section>
    );
  }
  