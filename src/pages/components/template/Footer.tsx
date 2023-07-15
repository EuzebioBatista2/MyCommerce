import { IconGitHub, IconHeart, IconLinkedin } from "../../../../public/icons/icons";

export default function Footer() {
    return (
        <div className={`flex w-full items-center h-14 bg-gray-800 dark:bg-gray-300 text-sm transition duration-500 ease-in-out`}>
            <div className="fold:hidden flex px-1">
                <a href='https://www.linkedin.com/in/euzebio-batista/'>
                    <i className="flex h-5 w-5 mr-1 fill-gray-200 dark:fill-black">{IconLinkedin}</i>
                </a>
                <a href='https://github.com/EuzebioBatista2'>
                    <i className="flex h-5 w-5 fill-gray-200 dark:fill-black">{IconGitHub}</i>
                </a>
            </div>
            <p className={`flex items-center justify-end w-full text-xs mr-1 text-center text-gray-200 dark:text-black`}>
                Desenvolvido com&nbsp;<i className="flex h-5 w-5 fill-red-500">{IconHeart}</i>&nbsp;por&nbsp;<strong>Euzebio Batista</strong>
            </p>
        </div>
    )
}