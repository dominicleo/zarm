# Mask 遮罩

## 基本用法

```jsx
import { useState } from 'react';
import { List, Button, Mask } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState({});
  const toggle = (type) => setVisible({ [type]: !visible[type] });

  return (
    <>
      <List>
        <List.Item
          title="默认"
          after={
            <Button size="xs" onClick={() => toggle('default')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="背景色"
          after={
            <Button size="xs" onClick={() => toggle('background')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="模糊背景"
          after={
            <Button size="xs" onClick={() => toggle('blur')}>
              开启
            </Button>
          }
        />
      </List>
      <Mask visible={visible.default} onClick={() => toggle('default')} />
      <Mask
        style={{ '--background-color': 'rgba(255, 255, 255, 0.7)' }}
        visible={visible.background}
        onClick={() => toggle('background')}
      />
      <Mask visible={visible.blur} type='blur' onClick={() => toggle('blur')} />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性    | 类型                               | 必填 | 默认值   | 说明                 |
| :------ | :--------------------------------- | :--- | :------- | :------------------- |
| visible | boolean                            | 否   | false    | 是否显示             |
| type    | 'normal' \| 'transparent'          | 否   | 'normal' | 类型                 |
| onClick | MouseEventHandler<HTMLDivElement\> | 否   | \&nbsp;  | 点击后触发的回调函数 |
