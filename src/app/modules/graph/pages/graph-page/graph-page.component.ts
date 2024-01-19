import { Component } from '@angular/core';
import { GraphChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TimelineComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { EChartsOption } from 'echarts';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import types from 'src/assets/dataJSON/types/poke_types.json';
import pokemons from 'src/assets/dataJSON/poke/pokemons.json';
import * as echarts from 'echarts';

interface Graph {
  nodes: any[];
  links: any[];
}

interface Category {
  name: string;
}

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent {
  readonly echartsExtentions: any[];
  echartsOptions!: EChartsOption;
  echartsTheme!: string;
  haveLoaded: boolean = false;
  myChart!: echarts.ECharts;
  id: number = 0;

  constructor(private themeService: ThemeService) {
    this.echartsExtentions = [
      TooltipComponent,
      GridComponent,
      LegendComponent,
      TitleComponent,
      GraphChart,
      TimelineComponent,
    ];
    this.themeService.theme$.subscribe(theme => {
      this.echartsTheme = theme;
      if (this.haveLoaded) {
        window.location.reload();
      } else {
        this.haveLoaded = true;
      }
    });
  }

  addNodes(nodes: any[], data: any, type: string) {
    let i = 0;
    data.forEach((element: any) => {
      let name = '';
      let symbolSize = 0;
      switch (type) {
        case 'Types':
          name = element['name'];
          symbolSize = 20;
          break;
        case 'Pokemons':
          name = element['pokemon_name'];
          symbolSize = 10;
          break;
      }
      nodes.push({
        id: this.id++,
        name: name,
        symbolSize: symbolSize,
        data: element,
        category: type,
        draggable: true,
        label: {
          show: true,
          formatter: name,
          fontSize: 10,
        },
      });
      i++;
    });
  }

  createLinkDamageRelations(
    relation: string,
    links: any[],
    element: any,
    nodes: any[]
  ) {
    let color = '';
    switch (relation) {
      case 'double_damage_from':
        color = '#FF0000';
        break;
      case 'double_damage_to':
        color = '#FF0000';
        break;
      case 'half_damage_from':
        color = '#00FF00';
        break;
      case 'half_damage_to':
        color = '#00FF00';
        break;
      case 'no_damage_from':
        color = '#0000FF';
        break;
      case 'no_damage_to':
        color = '#0000FF';
        break;
    }

    element['damage_relations'][relation].forEach((relation_element: any) => {
      links.push({
        source: this.findIndexByName(element['name'], nodes),
        target: this.findIndexByName(relation_element['name'], nodes),
        label: {
          show: false,
          formatter:
            element['name'] +
            ' ' +
            (relation as string).toLowerCase() +
            ' ' +
            relation_element['name'],
          fontSize: 10,
        },
        lineStyle: {
          color: color,
          curveness: 0.3,
        },
      });
    });
  }

  createLinkPokemonTypes(
    relation: string,
    links: any[],
    element: any,
    nodes: any[]
  ) {
    element['types'].forEach((type_element: any) => {
      links.push({
        source: this.findIndexByName(element['pokemon_name'], nodes),
        target: this.findIndexByName(type_element['type_name'], nodes),
        label: {
          show: false,
          formatter:
            element['pokemon_name'] +
            ' ' +
            (relation as string).toLowerCase() +
            ' ' +
            type_element['type_name'],
          fontSize: 10,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
      });
    });
  }

  addLinks(links: any[], data: any, type: string, nodes: any[]) {
    let i = 0;
    data.forEach((element: any) => {
      switch (type) {
        case 'Types':
          this.createLinkDamageRelations(
            'double_damage_from',
            links,
            element,
            nodes
          );
          this.createLinkDamageRelations(
            'double_damage_to',
            links,
            element,
            nodes
          );
          this.createLinkDamageRelations(
            'half_damage_from',
            links,
            element,
            nodes
          );
          this.createLinkDamageRelations(
            'half_damage_to',
            links,
            element,
            nodes
          );
          this.createLinkDamageRelations(
            'no_damage_from',
            links,
            element,
            nodes
          );
          this.createLinkDamageRelations('no_damage_to', links, element, nodes);
          break;
        case 'Pokemons':
          this.createLinkPokemonTypes('is_type', links, element, nodes);
          break;
      }
      i++;
    });
  }

  findIndexByName(name: string, nodes: any[]) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].name === name) {
        return nodes[i].id;
      }
    }
    return -1;
  }

  ngOnInit() {
    let graph: Graph = { nodes: [], links: [] };
    this.addNodes(graph.nodes, types, 'Types');
    this.addNodes(graph.nodes, pokemons, 'Pokemons');

    this.addLinks(graph.links, types, 'Types', graph.nodes);
    this.addLinks(graph.links, pokemons, 'Pokemons', graph.nodes);

    let categories: Category[] = [{ name: 'Types' }, { name: 'Pokemons' }];

    this.echartsOptions = {
      title: {},
      tooltip: {
        formatter: function (x: any) {
          if (x.dataType == 'edge') {
            return x.data.label.formatter;
          }
          return '';
        },
      },
      legend: [
        {
          data: categories.map(function (a) {
            return a.name;
          }),
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      focus: 'adjacency',
      series: [
        {
          name: "Pokem'Ontology",
          type: 'graph',
          layout: 'force',
          data: graph.nodes,
          links: graph.links,
          categories: categories,
          roam: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
          label: {
            show: true,
            position: 'inside',
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3,
          },
          emphasis: {
            scale: true,
            lineStyle: {
              width: 10,
            },
          },
          force: {
            repulsion: 150,
            edgeLength: 50,
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 10,
          },
        },
      ],
    };

    this.myChart = echarts.init(
      document.getElementById('graph'),
      this.echartsTheme
    );
    this.myChart.setOption(this.echartsOptions);
  }
}
