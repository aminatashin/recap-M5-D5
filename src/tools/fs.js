import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import PdfPrinter from "pdfmake";

const dataPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
console.log(dataPath);
const authorPath = join(dataPath, "author.json");
const blogspath = join(dataPath, "blogs.json");
const usersPublicPath = join(process.cwd(), "./public/img/users");
export const getAuthor = () => fs.readJSON(authorPath);
export const getBlogs = () => fs.readJSON(blogspath);
export const writeAuthor = (content) => fs.writeJSON(authorPath, content);
export const writeBlogs = (content) => fs.writeJSON(blogspath, content);
export const saveAvatar = (filename, contentbuffer) =>
  fs.writeFile(join(usersPublicPath, filename), contentbuffer);
export const getSource = () => fs.createReadStream(blogspath);
export const getWriteableStream = () =>
  fs.createWriteStream(dataPath, filename);

export const getReadPdf = (blog) => {
  const font = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };
  const printer = new PdfPrinter(font);
  const blogContent = (blog) => [
    {
      text: blog.title,
    },
    blog.content,
  ];
  const docDefinition = {
    content: blogContent(blog),
    style: {
      Headers: {
        fontSize: 18,
        bold: true,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfSource = printer.createPdfKitDocument(docDefinition, {});
  pdfSource.end();
  return pdfSource;
};
