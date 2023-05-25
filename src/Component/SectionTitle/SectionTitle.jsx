

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto my-12  max-w-sm text-center">
            <p className="text-yellow-500 text-2xl uppercase mb-4" >-----{subHeading}-----</p>
            <h2 className="py-7 border-y-2 text-4xl uppercase">{heading}</h2>
        </div>
    );
};

export default SectionTitle;