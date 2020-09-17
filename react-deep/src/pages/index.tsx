import React from 'react';
import styles from './index.less';
import ContextExercise from './contextExercise'
export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <ContextExercise />
    </div>
  );
}
