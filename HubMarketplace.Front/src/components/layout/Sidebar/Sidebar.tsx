import{
    ChevronFirst,
    ChevronLast,
    MoreVertical
} from 'lucide-react'; // icones do tailwind

import{
    createContext,
    type ReactNode,
    use,
    useContext, 
    useState  
}from 'react';

interface SidebarProps{
    children:ReactNode;
}//vai receber qualquer conteudo que queremos redenrizar dentro dele

interface SidebarMenuItemProps{
    icon: ReactNode; // icone
    text:string; // nome do item
    isActive?:boolean; // se o botão esta ativo
    hasAlert?:boolean; // sonalize se o menu tem atualização
}//recebe as propriedades para contruir o menu

const SidebarContext = createContext({
    isSidebarExpanded:true
});// compartilha com os outros componentes

export default function Sidebar({children} : SidebarProps){
    const[
        isSidebarExpanded,
        setSidebarExpanded
    ] = useState(true);

    const toggleSidebar = () => setSidebarExpanded((prevState) => ! prevState);

    return(
        <aside className='h-screen'>
            <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
                <LogoSection
                isSidebarExpanded={isSidebarExpanded}
                onToggle={toggleSidebar}/>
                <SidebarContext.Provider value={{isSidebarExpanded}}>
                    <ul className='flex-1 px-3'>{children}</ul>
                </SidebarContext.Provider>
                <ProfileSection isSidebarExpanded={isSidebarExpanded}></ProfileSection>
            </nav>
        </aside>
    )

}

function ProfileSection({isSidebarExpanded}: {isSidebarExpanded: boolean}){
    return (
        <div className='border-t flex p-3'>
            <img src="profile.png" className='w-10 h-10 rounded-md'/>
            <div className={`
                flex justify-between items-center
                overflow-hidden transition-all ${
                    isSidebarExpanded ? 'w-52 ml-3' : 'w-0'
                }
            `}>

                <div className='leading-4'>
                    <h4 className='font-semibold'>Jhon Doe</h4>
                    <span>jhondoe@gmail.com</span>
                </div>
            </div>
        </div>

    )
}

function LogoSection({isSidebarExpanded, onToggle,} :  {isSidebarExpanded: boolean; onToggle: () => void}){
    return(
        <div className='p-4 pb-2 flex justify-between items-center'>
            <img src="vit.svg" alt="" className={`overflow-hidden transition-all ${isSidebarExpanded ? 'w-13' : 'w-0'}`} />
            <button onClick={onToggle} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
                {isSidebarExpanded ? <ChevronFirst/> : <ChevronLast/>}
            </button>
        </div>
    )
}
    
