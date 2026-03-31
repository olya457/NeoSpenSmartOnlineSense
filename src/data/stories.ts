

export interface Story {
  id: string;
  title: string;
  preview: string;
  content: string;
}

export const stories: Story[] = [
  {
    id: 'story-1',
    title: 'Email That Looked Legit',
    preview: 'Michael checked his email early in the morning before work. Among the usual messages, one stood out. The subject line read: "Important Security Notice About Your Account..."',
    content: `Michael checked his email early in the morning before work. Among the usual messages, one stood out. The subject line read: "Important Security Notice About Your Account." The email looked professional. It had a familiar logo, proper formatting, and even a footer with contact details. Everything about it felt real.

The message said that unusual activity had been detected on his account and that immediate action was required. There was a button labeled "Verify Now." Michael hesitated for a second but then clicked it. The page that opened looked exactly like his bank's website. Without thinking too much, he entered his login details and completed the verification process.

A few hours later, he received a call from his actual bank. They asked if he had attempted several transactions. That was the moment he realized something was wrong. When he went back to the email, he noticed a small detail he had missed before. The sender's address was slightly different from the official one. Just one extra character.

This situation shows how convincing online deception can be. It does not rely on poor design or obvious mistakes. It relies on speed and distraction. People often act quickly when they feel urgency. The lesson here is simple but important. Never trust an email just because it looks correct. Always check the sender's address carefully. Never enter sensitive information through links in messages. Instead, open the official website manually and verify everything step by step.`,
  },
  {
    id: 'story-2',
    title: 'The Easy Job Offer',
    preview: 'Jessica was browsing online looking for flexible work. She found an advertisement that promised simple tasks, quick payments, and no experience required...',
    content: `Jessica was browsing online looking for flexible work. She found an advertisement that promised simple tasks, quick payments, and no experience required. It sounded perfect. She contacted the recruiter and received a quick reply.

They explained that the job involved completing small online tasks and receiving daily payments. Everything seemed straightforward. However, before starting, she was asked to "activate" her account with a small payment. The recruiter assured her that this amount would be returned with her first payout.

Jessica decided to try. The amount was small, and it seemed like a low-risk decision. After the payment, she received her first tasks. She completed them quickly. Then she was told that to unlock payments, she needed to upgrade her account level. This required another payment.

At this point, Jessica started feeling unsure, but she had already invested money and time. She did not want to lose what she had already spent. So she paid again. Then again.

Eventually, the communication stopped. The account was no longer accessible. The promised payments never came.

This situation demonstrates a gradual manipulation strategy. It starts with a small request, builds trust, and then increases pressure step by step. The key lesson is that legitimate work does not require upfront payments. If someone asks for money before providing real value, it is a clear warning sign.`,
  },
  {
    id: 'story-3',
    title: 'The Unexpected Prize',
    preview: 'Daniel received a message that said, "Congratulations! You have been selected as a winner." He did not remember entering any contest...',
    content: `Daniel received a message that said, "Congratulations! You have been selected as a winner." He did not remember entering any contest, but curiosity got the better of him. The message looked exciting and official.

There was a link to claim the reward. After clicking it, he was taken to a page that explained the prize and asked for confirmation details. Everything seemed structured and convincing. At the final step, he was asked to pay a small delivery fee to receive the prize.

The amount was not large, and it felt reasonable. Daniel entered his card details and completed the process. After that, nothing happened. No confirmation, no delivery.

Later, he noticed unauthorized transactions on his card. That was when he realized what had happened.

This type of deception works through emotional triggers. Excitement reduces critical thinking. The most important rule here is simple. If you did not participate in something, you cannot win it. Any message that promises unexpected rewards should be treated with caution and skepticism.`,
  },
  {
    id: 'story-4',
    title: 'Fake Customer Support',
    preview: 'Emily was having trouble accessing her account on a service she used regularly. She searched online for support and found a chat link that looked official...',
    content: `Emily was having trouble accessing her account on a service she used regularly. She searched online for support and found a chat link that looked official. The page design matched the service, and everything seemed legitimate.

She started a conversation. The response came quickly. The representative was polite and helpful. They asked for her account email, which seemed normal. Then they asked for her password to "verify identity."

Emily hesitated but decided to provide the information. Shortly after, she lost access to her account. When she contacted the real support team, they confirmed that they never ask for passwords.

This situation highlights how easily trust can be exploited. People tend to rely on appearance and tone. A well-designed interface and polite communication can create a false sense of safety.

The key takeaway is clear. No legitimate service will ever ask for your password directly. Always use official channels and verify sources before sharing any sensitive information.`,
  },
  {
    id: 'story-5',
    title: 'Online Relationship Manipulation',
    preview: 'Alex met someone online. The conversation started casually but quickly became personal. The other person seemed attentive, understanding, and emotionally engaging...',
    content: `Alex met someone online. The conversation started casually but quickly became personal. The other person seemed attentive, understanding, and emotionally engaging. Over time, trust developed.

After a few days, the person shared a story about a difficult situation and asked for help. The amount requested was small. Alex decided to help. Soon after, another issue appeared. Then another.

Each time, the story felt believable. Each time, the request grew slightly larger. Alex started to feel responsible and continued sending money.

Eventually, communication stopped completely. The profile disappeared.

This type of manipulation uses emotional connection. It builds trust first and then introduces requests. The lesson is to remain cautious even in seemingly personal interactions. Trust should not be established too quickly, especially when financial requests are involved.`,
  },
  {
    id: 'story-6',
    title: 'The Clone Website',
    preview: 'Sophie was searching for a product online. She found a website offering a great deal. The design looked identical to a well-known store...',
    content: `Sophie was searching for a product online. She found a website offering a great deal. The design looked identical to a well-known store. The layout, colors, and structure all matched.

She placed an order and entered her payment details. Everything appeared normal. After completing the purchase, the site became inaccessible.

When she checked the address, she noticed a slight difference in the domain name. It was not the official site.

This situation shows how visual similarity can be misleading. A website can look perfect but still be fraudulent. The most important step is to verify the URL carefully before entering any information.`,
  },
];