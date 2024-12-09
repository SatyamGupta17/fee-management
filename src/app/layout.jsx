import './style.css';
import "../css/satoshi.css";
import "../css/style.css";

export const metadata = {
  title: "Fee Management System",
  description: "Developed a Fee management system that is used to store the data of students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> 
        {children} 
      </body>
    </html>
  );
}
