import classes from './Section.module.css';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode
}

const Section = (props: SectionProps) => {
  return <section className={classes.section}>{props.children}</section>;
};

export default Section;
//d3
