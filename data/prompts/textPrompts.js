//
// Without code
//

export const promptTaskDescription = [
  'Take the human query in the [Instruction] section, convert it to HTML code with inline CSS styling, and put the result in the [Code] section.\n\n',
  // '',
];

export const promptTaskDescriptionAndOneExample = [
  promptTaskDescription,
  `[Instruction]: Create a blue Button with white text that says 'Sign in'.\n`,
  `[Code]: <button style="color: white; background-color: blue;">Sign in</button>\n`,
].join('');

export const promptTaskDescriptionAndThreeExamples = [
  promptTaskDescription,
  `[Instruction]: Create a blue Button with white text that says 'Sign in'.\n`,
  `[Code]: <button style="color: white; background-color: blue;">Sign in</button>\n`,
  `[Instruction]: Create a flex layout with 3 columns and 1 row.\n`,
  `[Code]: <div style="display: flex; flex-direction: row;">\n`,
  `  <div style="flex: 1;"></div>\n`,
  `  <div style="flex: 1;"></div>\n`,
  `  <div style="flex: 1;"></div>\n`,
  `</div>\n`,
  `[Instruction]: Add a heading that says 'Hello World'.\n`,
  `[Code]: <h1>Hello World</h1>\n`,
].join('');

export const promptTaskDescriptionAndTenSeparateExamples = [
  promptTaskDescription,
  // 1
  `[Instruction]: Create a blue Button with white text that says 'Sign in'.\n`,
  `[Code]: <button style="color: white; background-color: blue;">Sign in</button>\n`,
  // 2
  `[Instruction]: Create a flex layout with 3 columns and 1 row.\n`,
  `[Code]: <div style="display: flex; flex-direction: row;">\n`,
  `  <div style="flex: 1;"></div>\n`,
  `  <div style="flex: 1;"></div>\n`,
  `  <div style="flex: 1;"></div>\n`,
  `</div>\n`,
  // 3
  `[Instruction]: Add a heading that says 'Hello World' and has a size of 4rem.\n`,
  `[Code]: <h1 style="font-size: 4rem;">Hello World</h1>\n`,
  // 4
  `[Instruction]: Create a h2 tag that says 'Welcome' and is blue.\n`,
  `[Code]: <h2 style="color: blue;">Welcome</h2>\n`,
  // 5
  `[Instruction]: Create a contact form with a submit button and input fields for name and email.\n`,
  `[Code]: <form>\n`,
  `  <input type="text" name="name" placeholder="Name">\n`,
  `  <input type="email" name="email" placeholder="Email">\n`,
  `  <button type="submit">Submit</button>\n`,
  `</form>\n`,
  // 6
  `[Instruction]: Create a paragraph with the text 'Boost your productivity. Start using our app today.'.\n`,
  `[Code]: <p>Boost your productivity. Start using our app today.</p>\n`,
  // 7
  `[Instruction]: Create a section with a centered heading that says 'Contact me' and is 3rem high.\n`,
  `[Code]: <section>\n`,
  `  <h1 style="text-align: center; font-size: 3rem;">Get in touch</h1>\n`,
  `</section>\n`,
  // 8
  `[Instruction]: Create a unordered list with the items: React, Vue and Angular.\n`,
  `[Code]: <ul>\n`,
  `  <li>React</li>\n`,
  `  <li>Vue</li>\n`,
  `  <li>Angular</li>\n`,
  `</ul>\n`,
  // 9
  `[Instruction]: Create an article with a heading that says 'WordPress' and a paragraph that says 'The most used CMS worldwide.'.\n`,
  `[Code]: <article>\n`,
  `  <h3>WordPress</h3>\n`,
  `  <p>The most used CMS worldwide.</p>\n`,
  `</article>\n`,
  // 10
  `[Instruction]: Create a grid with two rows and two columns with a gap of 2rem between the cells. Each cell should have a color of #e2e8f0 and a height of 12rem.\n`,
  `[Code]: <div style="display: grid; gap: 2rem; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;">\n`,
  `  <div style="background-color: #e2e8f0; height:12rem"></div>\n`,
  `  <div style="background-color: #e2e8f0; height:12rem"></div>\n`,
  `  <div style="background-color: #e2e8f0; height:12rem"></div>\n`,
  `  <div style="background-color: #e2e8f0; height:12rem"></div>\n`,
  `</div>\n`,
].join('');

export const promptOneExample = [
  `[Instruction]: Create a blue Button with white text that says 'Sign in'.\n`,
  `[Code]: <button style="color: white; background-color: blue;">Sign in</button>\n`,
].join('');
