import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
useTranslations;
const About = () => {
  const t = useTranslations("About");
  return (
    <div className="align-element py-5">
      <Typography variant="h4" color="primary">
        {t("title")}
      </Typography>
      <div className="flex flex-col gap-5 mt-5">
        <p>{t("description1")}</p>
        <p>{t("description2")}</p>
        <p>{t("description3")}</p>
      </div>
    </div>
  );
};

export default About;
