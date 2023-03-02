import styles from "../styles/skills.module.css";

export interface ISkillsProps {
  skills: string[];
}

export default function Skills({ skills }: ISkillsProps) {
  return (
    <section id="skills" className={styles.skills}>
      <h2>Skills</h2>
      <ul className={styles.skills}>
        {skills.map((skill, index) => {
          if (skill.length === 0)
            return null;

          return (
            <li key={index}>{skill}</li>
          );
        })}
      </ul>
    </section>
  );
}