export default {
  wrapper: { className: 'home-page-wrapper content5-wrapper' },
  page: { className: 'home-page content5' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      { name: 'title', children: '集团系统', className: 'title-h1' },
      {
        name: 'content',
        className: 'title-content',
        children: '在这里用一段话介绍服务的案例情况',
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
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E4%B8%AD%E7%A7%BB%E7%BD%91%E5%A4%A7.png',
          },
          content: { children: '中移网大' },
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
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E5%85%9A%E5%BB%BA%E5%B9%B3%E5%8F%B0.png',
          },
          content: { children: '党建平台' },
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
              'https://alipublic.oss-cn-beijing.aliyuncs.com/img/img_logo/%E7%94%B5%E5%95%86%E5%B9%B3%E5%8F%B0.png',
          },
          content: { children: '电商平台' },
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
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
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
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
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
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
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
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
        },
      },
    ],
  },
};
