/**
 * 执行添加，并把新增的条目滚入视口。
 * 新条目可能在首部或尾部（reverseOrder），按添加前后的节点差集定位；嵌套时取文档顺序第一个（外层条目）。
 */
const scrollToAdded = (container, selector, add) => {
  const before = new Set(container ? container.querySelectorAll(selector) : []);
  add();
  if (!container) {
    return;
  }
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const added = Array.from(container.querySelectorAll(selector)).find(el => !before.has(el));
      if (added && typeof added.scrollIntoView === 'function') {
        added.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    })
  );
};

export default scrollToAdded;
