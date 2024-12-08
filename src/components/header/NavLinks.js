import { useTranslations } from "next-intl";
import MenuItem from "./MenuItem";

const navigation = [
  { id: "home", title: "home", address: "/" },
  { id: "about", title: "about", address: "about" },
];
const NavLinks = ({ toggleNav }) => {
  const t = useTranslations("HomePage");
  return (
    <>
      {navigation.map((item) => {
        return (
          <li key={item.id}>
            <MenuItem
              address={`/${item.address}`}
              title={t(`navigation.${item.title}`)}
              toggleNav={toggleNav}
            />
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
