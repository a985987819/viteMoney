/**
 * 多步骤对话框使用示例
 * 
 * 这个文件展示了如何在项目中使用支持多步骤的 StardewDialog 组件
 */

import React, { useState } from 'react';
import StardewDialog from './index';

// 示例 1: 基础用法 - 短内容单页显示
export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>
        打开短消息对话框
      </button>
      <StardewDialog
        visible={visible}
        content="你好！这是一个短消息，会在一页内显示完成。"
        speaker="系统助手"
        speakerImage="/avatar.png"
        onOk={() => {
          alert('点击了确定');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 2: 长内容自动分页
export const LongContentExample = () => {
  const [visible, setVisible] = useState(false);
  const longContent = `
    这是一个非常长的消息示例。当你看到这段文字时，
    会发现它被自动分割成了多页显示。系统会智能地在合适的位置进行分页，
    确保每页的内容都能完整地显示在对话框中。
    
    这是第二段内容。你可以点击屏幕任意位置或者"确定"按钮来切换到下一页。
    这种设计可以让用户更好地阅读和理解长内容，避免信息过载。
    
    这是最后一段内容。在最后一页，你会看到"确定"和"取消"按钮，
    可以进行相应的操作。这样的设计既美观又实用。
  `.trim();

  return (
    <>
      <button onClick={() => setVisible(true)}>
        打开长消息对话框
      </button>
      <StardewDialog
        visible={visible}
        content={longContent}
        speaker="系统"
        maxCharsPerPage={100}  // 设置每页最大字符数
        enableMultiStep={true}  // 启用多步骤模式
        onOk={() => {
          console.log('阅读完成');
          setVisible(false);
        }}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 3: 手动控制分页（数组形式）
export const ManualPaginationExample = () => {
  const [visible, setVisible] = useState(false);
  const pages = [
    '👋 欢迎使用本功能！\n\n让我为你介绍一下基本操作流程。',
    '📝 第一步：填写基本信息\n\n请输入你的姓名、联系方式等必要信息。',
    '⚙️ 第二步：进行设置\n\n根据你的需求配置相关参数。',
    '✅ 第三步：确认提交\n\n检查所有信息无误后，点击提交按钮。',
    '🎉 完成！\n\n你的操作已成功提交，我们会尽快处理。'
  ];

  return (
    <>
      <button onClick={() => setVisible(true)}>
        打开引导流程对话框
      </button>
      <StardewDialog
        visible={visible}
        content={pages}
        speaker="引导助手"
        speakerImage="/guide.png"
        okText="下一步"
        cancelText="跳过"
        onOk={() => {
          console.log('完成引导');
          setVisible(false);
        }}
        onCancel={() => {
          console.log('跳过引导');
          setVisible(false);
        }}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 4: 禁用多步骤模式
export const DisabledMultiStepExample = () => {
  const [visible, setVisible] = useState(false);
  const longContent = '虽然这段内容很长，但是我不想让它分页显示。我想让用户一次性看到所有内容，可以通过滚动来查看完整信息。'.repeat(5);

  return (
    <>
      <button onClick={() => setVisible(true)}>
        打开不分页的对话框
      </button>
      <StardewDialog
        visible={visible}
        content={longContent}
        speaker="系统"
        enableMultiStep={false}  // 禁用多步骤模式
        onOk={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 5: 确认对话框（带多步骤说明）
export const ConfirmationExample = () => {
  const [visible, setVisible] = useState(false);

  const content = [
    '⚠️ 删除确认\n\n你确定要删除这条记录吗？',
    '📋 删除内容：\n- 记录 ID: 12345\n- 金额：¥100.00\n- 分类：餐饮',
    '❗ 注意事项\n\n删除后数据将无法恢复，请谨慎操作。'
  ];

  return (
    <>
      <button onClick={() => setVisible(true)}>
        删除记录
      </button>
      <StardewDialog
        visible={visible}
        content={content}
        speaker="警告"
        speakerImage="/warning.png"
        okText="确定删除"
        cancelText="取消"
        onOk={() => {
          // 执行删除操作
          console.log('删除记录');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 6: 功能介绍（多步骤）
export const FeatureIntroductionExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>
        查看功能介绍
      </button>
      <StardewDialog
        visible={visible}
        content={[
          '📊 统计功能介绍\n\n我们提供了强大的数据统计功能，帮助你更好地了解收支情况。',
          '📈 图表展示\n\n支持多种图表类型：柱状图、折线图、饼图等，直观展示数据趋势。',
          '📅 时间筛选\n\n可以按日、周、月、年查看统计数据，支持自定义时间范围。',
          '💰 分类统计\n\n按分类统计收支，了解钱都花在哪里了。',
          '🎯 预算对比\n\n将实际支出与预算进行对比，帮助你控制消费。'
        ]}
        speaker="功能助手"
        speakerImage="/features.png"
        okText="下一页"
        cancelText="关闭"
        onOk={() => console.log('查看完成')}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 示例 7: 自定义每页字符数
export const CustomCharLimitExample = () => {
  const [visible, setVisible] = useState(false);
  const content = '这是一段测试内容。'.repeat(20);

  return (
    <>
      <button onClick={() => setVisible(true)}>
        自定义字符数限制
      </button>
      <StardewDialog
        visible={visible}
        content={content}
        speaker="系统"
        maxCharsPerPage={50}  // 每页只显示 50 个字符
        onOk={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

// 主示例组件 - 展示所有用法
const DialogExamples = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>多步骤对话框使用示例</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <BasicExample />
        <LongContentExample />
        <ManualPaginationExample />
        <DisabledMultiStepExample />
        <ConfirmationExample />
        <FeatureIntroductionExample />
        <CustomCharLimitExample />
      </div>
    </div>
  );
};

export default DialogExamples;
