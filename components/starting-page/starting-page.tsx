import classes from "./starting-page.module.css";

interface IStartingPageProps {}

const StartingPage: React.FunctionComponent<IStartingPageProps> = (props) => {
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default StartingPage;
