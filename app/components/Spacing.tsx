interface Props {
  w?: number;
  h?: number;
}

export default function Spacing({ w, h }: Props) {
  const style = {
    width: w || "100%",
    height: h || "100%",
  };
  return <div style={style} />;
}
