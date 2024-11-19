import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/addCabin";
import CabinTableOps from "../features/cabins/CabinTableOps";

function Cabins() {   
   return (
      <>
         <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <CabinTableOps />
         </Row>

         <Row>
            <AddCabin />
            <CabinTable />
         </Row>
      </>
   );
}

export default Cabins;