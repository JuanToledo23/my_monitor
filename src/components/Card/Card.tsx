import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import labelImg from "../../assets/images/container.jpg";
import Alert from "@mui/material/Alert";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";

interface DataItem {
    body: string;
  }

interface Data {
    id: string
    status: boolean
    name: string
    _id: string
}

export default function MonitorCard() {
  const date = new Date();

  const [data, setData] = useState<Data[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://td6jaeavx5.execute-api.us-east-1.amazonaws.com/dev'); // Reemplaza con tu URL de API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: DataItem = await response.json();
        setData(JSON.parse(data.body));
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // setInterval(() => {
    //     fetchData();
    // }, 1000);
  }, []);

  useEffect(() => {
    console.log(data)
   }, [data])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  return (
    <>
    {
        data?.map((item: Data) => {
            return (<Card sx={{ maxWidth: 345 }} key={item._id}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      HCl
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.name}
                  subheader={`${date.getDay()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={labelImg}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "10px" }}
                  >
                    El ácido clorhídrico es una disolución acuosa del gas cloruro de
                    hidrógeno. Es muy corrosivo y ácido. Se emplea comúnmente como
                    reactivo químico y se trata de un ácido fuerte que se disocia
                    completamente en disolución acuosa.
                  </Typography>
                  <Divider />
                  {item.status ? <Alert variant="filled" severity="success">
                      El liquido esta por arriba del nivel
                  </Alert> : <Alert variant="filled" severity="error">
                      El liquido esta por debajo del nivel
                  </Alert>}
                </CardContent>
              </Card>)
        })
    }
    </>
  );
}
