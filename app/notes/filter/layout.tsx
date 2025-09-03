import { ReactNode } from 'react';
import css from './layout.module.css';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
  modal?: ReactNode;
};

export default function Layout({ children, sidebar, modal }: Props) {
  return (
    <div className={css.layout}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      {modal}
    </div>
  );
}