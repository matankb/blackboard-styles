const queries = {
  courseTitle: 'bb-base-course-card .js-course-title-element',
  courseId: 'bb-base-course-card .course-id span:not(.altered)',
}

const getElements = query => Array.from(document.querySelectorAll(query));

const trimCourseTitleElement = courseTitleElement => {
  courseTitleElement.textContent = courseTitleElement.textContent.split(' (')[0];
}

const trimCourseIdElement = courseIdElement => {
  const id = courseIdElement.textContent.split('.')[0];
  if (!id) return;
  const index = id.search(/\d/);
  courseIdElement.textContent = id.slice(0, index) + ' ' + id.slice(index)
  courseIdElement.classList.add('altered');
}

function main() {
  if (!window.location.href.includes('course')) {
    return;
  }

  const observer = new MutationObserver(() => {
    getElements(queries.courseTitle).forEach(trimCourseTitleElement);
    getElements(queries.courseId).forEach(trimCourseIdElement);
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

window.addEventListener('locationchange', () => {
  main();
})