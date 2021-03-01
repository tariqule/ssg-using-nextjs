import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Welcome to my ssg site</h1>
      <Link href="/users"> Find all users</Link>
    </div>
  );
}
