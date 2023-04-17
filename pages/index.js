import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import React from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>MeetUp APP</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://sefa:X58PT6p3K7GlJl8C@cluster0.fm6qzkp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        address: meetup.address,
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};
export default HomePage;
