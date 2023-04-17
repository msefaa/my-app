import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import React from "react";

const meetupsList = [
  {
    id: "m1",
    title: "Rijksmuseum Amsterdam",
    image:
      "https://cdn.museum.nl/assets/c1da6f0c-7718-4a4e-af2e-d28bc36e8b46?w=3000&c=e1debc3372c1e6d198e1fd7d3603296d039f48f473b9f4a20971174ecefd95cc",
    address: "Rijksmuseum Amsterdam 43433",
    description: "Avrupa baş yapitlari içeren sanat müzesi",
  },
  {
    id: "m2",
    title: "Volendam Amsterdam",
    image:
      "https://images.musement.com/cover/0142/62/volendam-jpeg_header-14161163.jpeg",
    address: "Volendam Amsterdam 43433",
    description: "Avrupa baş yapitlari içeren sanat müzesi",
  },
];
function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
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
