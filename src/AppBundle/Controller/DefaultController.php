<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/version", name="version")
     */
    public function versionAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/version.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/", name="home")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig');
    }
    /**
     * @Route("examples/piechart", name="piechart")
     */
    public function piechartAction(Request $request)
    {
        // replace a example of D3JS piechart
        return $this->render('default/piechart.html.twig');
    }
    /**
     * @Route("examples/linechart", name="linechart")
     */
    public function linechartAction(Request $request)
    {
        // replace a example of D3JS piechart
        return $this->render('default/linechart.html.twig');
    }
}
