
export interface BlogPost {
  id: string;
  title: string;
  preview: string;
  image: any;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Think Before You Click',
    preview:
      'In modern digital environments, almost everything is designed to capture your attention and push you toward quick actions...',
    image: require('../assets/images/blog_think_before_click.png'),
    content: `In modern digital environments, almost everything is designed to capture your attention and push you toward quick actions. Notifications appear constantly, messages demand immediate responses, and interfaces are built to guide you toward pressing buttons without hesitation. This creates a pattern where users react instead of thinking.

However, most online risks rely exactly on this behavior. When a person acts too quickly, they skip important steps such as verifying information, checking sources, or understanding what they are agreeing to. A single click on the wrong link can lead to exposing personal data or giving access to sensitive accounts.

Taking even a few seconds to pause can significantly reduce risk. Before interacting with any message, link, or request, it is important to ask simple questions. Where did this come from? Does it make sense? Is there any urgency that feels artificial?

Developing the habit of slowing down creates a strong layer of protection. It shifts behavior from impulsive to intentional. Over time, this small change can prevent most common online mistakes and help maintain control over your digital environment.`,
  },
  {
    id: 'blog-2',
    title: 'How Manipulation Works Online',
    preview:
      'Online manipulation is rarely obvious. It does not look like a threat at first glance. Instead, it is often presented as something helpful, urgent, or emotionally engaging...',
    image: require('../assets/images/blog_manipulation.png'),
    content: `Online manipulation is rarely obvious. It does not look like a threat at first glance. Instead, it is often presented as something helpful, urgent, or emotionally engaging. This makes it effective because it targets how people naturally react rather than how they logically think.

One of the most common techniques is creating urgency. Messages that say something must be done immediately reduce the time available for thinking. Another method is emotional engagement. Exciting rewards, fear of loss, or personal stories can influence decisions without proper evaluation.

Manipulation also often relies on familiarity. When something looks similar to a trusted service, users are more likely to accept it without question. Visual design, language, and structure are used to create a sense of legitimacy.

Understanding these patterns is essential. When users recognize how manipulation works, they become less likely to respond automatically. Instead of reacting, they begin to analyze. This shift from emotion-driven action to awareness-based thinking is what reduces risk and increases control.`,
  },
  {
    id: 'blog-3',
    title: 'Awareness Is a Skill',
    preview:
      'Many people assume that being safe online is something intuitive, but in reality, it is a learned skill. Awareness does not appear automatically...',
    image: require('../assets/images/blog_awareness.png'),
    content: `Many people assume that being safe online is something intuitive, but in reality, it is a learned skill. Awareness does not appear automatically. It develops through repeated actions, attention to detail, and the ability to question what is being presented.

Every interaction in a digital environment involves decisions. Opening a link, entering information, or trusting a message all require judgment. Without awareness, these decisions become automatic and often unsafe.

Building awareness means creating habits. Checking addresses, verifying sources, and questioning unexpected requests are simple actions, but they need to be practiced consistently. Over time, they become natural responses instead of conscious effort.

Awareness also means accepting uncertainty. Not everything needs to be trusted immediately. Taking time to confirm information is a sign of control, not hesitation.

The more these habits are reinforced, the stronger the overall protection becomes. Awareness turns from a concept into a practical tool that supports safe and confident navigation through digital environments.`,
  },
];