import {Fragment, useState, React} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import styles from "./Courses.module.css"
import CoursePageTabs from './CoursePageTabs';

const CoursePage = ({text}) => {
  const [state, setState] = useState({
    right: false,
  });

  const anchor = 'right';

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box className={styles.mainCourseBox}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={styles.mainCoursePage}>
        <div className={styles.courseContent}>
          <CoursePageTabs />
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{text}</Button>
        <Drawer
          PaperProps={{ style: {position: 'absolute', marginTop: 64, height: 757, width: 1350 }}}
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </Fragment>
    </div>
  );
}

export default CoursePage;