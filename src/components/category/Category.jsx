import { category } from "../../constant/index";
import { colors } from "../../constant/colors";
function Category({ selectedCategoryHandle, selectedCategory }) {
  return (
    <section className="flex w-full mx-start gap-4 justify-start overflow-scroll md:overflow-auto">
      {category.map((item) => (
        <button
          key={item.name}
          className="category-btn"
          style={{
            borderRadius: "0",
            backgroundColor: item.name === selectedCategory && colors.secondary,
            color: item.name === selectedCategory && "#fff",
          }}
          onClick={() => {
            selectedCategoryHandle(item.name);
          }}
        >
          <span
            style={{
              color: item.name === selectedCategory ? "#fff" : colors.secondary,
              marginRight: "15px",
            }}
          >
            {item.icon}
          </span>
          <span style={{ opacity: "1" }}>{item.name}</span>
        </button>
      ))}
    </section>
  );
}

export default Category;
