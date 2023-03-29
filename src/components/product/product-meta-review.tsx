import { useState } from "react";
import { Collapse } from "@components/common/accordion";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	return (
		<>
			{data?.meta.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					translatorNS="review"
					content={item.content}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
