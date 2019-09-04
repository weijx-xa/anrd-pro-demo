export default {
  wrapper: { className: 'home-page-wrapper content2-wrapper' },
  page: { className: 'home-page content5' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      { name: 'title', children: '总部系统', className: 'title-h1' },
      {
        name: 'content',
        className: 'title-content',
        children: '这里展示的是总部系统',
      },
    ],
  },
  block: {
    className: 'content5-img-wrapper',
    gutter: 16,
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90.png',
          },
          content: { children: '人力资源' },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E4%BE%9B%E5%BA%94%E9%93%BE.png',
          },
          content: { children: '供应链' },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E5%95%86%E6%97%85100.png',
          },
          content: { children: '商旅100' },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E7%BB%B4%E6%8A%A4MIS.png',
          },
          content: { children: '维护MIS' },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F.png',
          },
          content: { children: '邮件系统' },
        },
      },
      {
        name: 'block5',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E8%AE%A1%E5%88%92%E5%BB%BA%E8%AE%BE%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F.png',
          },
          content: { children: '计划建设管理系统' },
        },
      },
      {
        name: 'block6',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6%E7%B3%BB%E7%BB%9F.png',
          },
          content: { children: '资源调度系统' },
        },
      },
      {
        name: 'block7',
        className: 'block',
        md: 4,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E5%B8%82%E5%9C%BA%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F.png',
          },
          content: { children: '市场信息系统' },
        },
      },
    ],
  },
};
