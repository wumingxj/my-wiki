import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Markdown-First',
    description: (
      <>
        Write all documentation in Markdown or MDX. Full support for code
        blocks with syntax highlighting, tables, admonitions, and diagrams.
      </>
    ),
    icon: '📝',
  },
  {
    title: 'Team Collaboration',
    description: (
      <>
        Version-controlled docs via Git. Anyone on the team can propose changes
        through pull requests, keeping docs reviewed and up-to-date.
      </>
    ),
    icon: '🤝',
  },
  {
    title: 'Structured by Default',
    description: (
      <>
        Organized into Architecture, API, Runbooks, Infrastructure, and ADR
        sections so the right doc is always easy to find.
      </>
    ),
    icon: '🗂️',
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--lg">
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
