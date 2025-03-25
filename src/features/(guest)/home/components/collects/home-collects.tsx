import Button from "@/components/(guest)/layout/button";

export default function HomeCollects() {
  return (
    <div className="  flex h-screen w-full mt-10 mb-20">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          srcSet="/images/homepage_footer_1.png"
        />
      </div>
      <div className="flex flex-col h-full w-full overflow-hidden bg-[#EFE5D2] items-center justify-center">
        <p className="philosopher-regular text-7xl">BỘ SƯU TẬP</p>
        <p className="philosopher-regular text-7xl text-[#E48E43]">DEJÀ VU</p>
        <img
          className="w-1/2 h-1/2 object-contain my-7"
          srcSet="/images/hompage_footer_2.png"
        />
        <Button title="XEM THÊM" />
      </div>
    </div>
  );
}
