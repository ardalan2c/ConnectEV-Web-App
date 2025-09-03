export const smsNudgeMissingPhotos = (first: string) =>
  `Hi ${first}, it's ConnectEV. Reply with photos of your panel (door open, main breaker, label) and we'll finish your estimate. Reply STOP to opt out.`;

export const emailNudgeMissingPhotos = (first: string) => ({
  subject: 'Finish your ConnectEV estimate',
  html: `<p>Hi ${first},</p>
  <p>We're missing panel photos to complete your price band. Please reply with three photos:
  <ol><li>Panel with door open</li><li>Main breaker showing rating</li><li>Inside label</li></ol></p>
  <p>We'll confirm scope and earliest dates right away.</p>
  <p>— ConnectEV Inc.</p>`
});

export const emailReviewRequest = (first: string, gbpLink: string) => ({
  subject: 'How did we do? — ConnectEV',
  html: `<p>Hi ${first},</p>
  <p>Thanks for choosing ConnectEV. If everything looks great, would you mind sharing a quick review?</p>
  <p><a href="${gbpLink}">Leave a Google review</a></p>
  <p>We appreciate you!</p>`
});